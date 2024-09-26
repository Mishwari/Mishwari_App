import { z } from "zod";
import  {UserDetailsSchema} from './userDetails'
import { TripSchema } from "./trip";
import { PassengerSchema } from "./passenger"

export const BookingSchema = z.object({ 
    id: z.number(),
    status: z.enum(['completed', 'cancelled', 'active','pending']),
    user: UserDetailsSchema,
    trip: TripSchema,
    passengers: z.array(PassengerSchema),
    is_paid: z.boolean(),
    payment_method: z.enum(['cash', 'wallet', 'stripe']),
    booking_time: z.string(),
})/// use for api 

export type Booking = z.infer<typeof BookingSchema> // use for pages

