'use server';

import Event from '@/database/event.model';
import connectDB from "@/lib/mongodb";

export default async function getSimilarEventsBySlug (slug: string)  {
    try {
        await connectDB();
        const event = await Event.findOne({ slug });        
        const simevent =  await Event.find({ _id: { $ne: event.id }, tags: { $in: event.tags } }).lean();
        console.log(simevent);
        return simevent;
    } catch {
        return [];
    }
}