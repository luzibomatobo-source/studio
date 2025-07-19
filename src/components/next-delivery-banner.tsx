"use client";

import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

function calculateNextDeliveryDate() {
    const now = new Date();
    // The reference start date for all delivery calculations (Thursday, 31 July 2025)
    const cycleStartDate = new Date(Date.UTC(2025, 6, 31, 0, 0, 0)); // July is month 6

    // If current date is before the absolute start date, show the start date.
    if (now.getTime() < cycleStartDate.getTime()) {
      return cycleStartDate;
    }

    // Calculate the milliseconds for a 2-week cycle
    const twoWeeksInMillis = 14 * 24 * 60 * 60 * 1000;

    // Find the number of full 2-week cycles that have passed since the start date
    const elapsedMillis = now.getTime() - cycleStartDate.getTime();
    const cyclesPassed = Math.floor(elapsedMillis / twoWeeksInMillis);

    // The next delivery is the start date plus (cycles passed + 1) * two weeks
    const nextDeliveryDate = new Date(cycleStartDate.getTime() + (cyclesPassed + 1) * twoWeeksInMillis);
    
    return nextDeliveryDate;
}

export default function NextDeliveryBanner() {
    const [nextDeliveryDate, setNextDeliveryDate] = useState<string | null>(null);

    useEffect(() => {
        const date = calculateNextDeliveryDate();
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
        setNextDeliveryDate(date.toLocaleDateString('en-ZA', options));
    }, []);

    if (!nextDeliveryDate) {
        return null;
    }

    return (
        <div className="bg-primary text-primary-foreground text-center text-base font-bold p-3 flex items-center justify-center gap-2">
            <Calendar className="h-5 w-5" />
            <span>Next Delivery Date: <span className="font-extrabold underline">{nextDeliveryDate}</span></span>
        </div>
    );
}
