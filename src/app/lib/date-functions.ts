'use client'

export function getDifferenceInHoursAndMinutes(startDate: Date, endDate: Date): { hours: number, minutes: number } {
    const differenceInMs = Math.abs(endDate.getTime() - startDate.getTime());
    const hours = Math.floor(differenceInMs / (1000 * 60 * 60));
    const minutes = Math.floor((differenceInMs % (1000 * 60 * 60)) / (1000 * 60));
    return { hours, minutes };
}