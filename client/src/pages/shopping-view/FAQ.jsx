import React from 'react';
import { Link } from "react-router-dom";
import BookingForm from './BookingForm';
import Footer from './Footer';
import CallToAction from './CallToAction';

const FAQ = () => {
    return (
        <div className="flex flex-col min-h-screen bg-brand-cream">
        <div className="bg-[#f9f5ef] text-[#333] p-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* FAQ Section */}
                <div className="md:col-span-2">
                    <h2 className="text-3xl font-serif text-[#b89d4f] mb-6">FAQs</h2>
                    <div className="space-y-4">
                        <details className="border rounded-lg bg-white p-4 shadow-sm">
                            <summary className="cursor-pointer font-semibold text-lg">
                                What is Life Casting / How does the casting process work?
                            </summary>
                            <div className="mt-2 text-md space-y-2">
                                <p>
                                    Life Casting is the art of capturing a moment—forever. It involves creating a highly detailed, 3D replica of the hands or feet using expert molding and casting techniques. Every wrinkle, line, and even fingerprint is preserved with stunning realism.
                                </p>
                                <p>
                                    Whether wall-mounted, placed on a stand, or suspended, each life cast becomes a one-of-a-kind piece of art—ideal for homes, studios, or as a heartfelt gift.
                                </p>
                                <p className="font-semibold text-lg">Our Process: Quick, Safe & Comfortable</p>
                                <p>
                                    We help you relax and pose comfortably. Then, we apply our custom skin-safe molding material—warm and smooth like yogurt.
                                    Within 2 to 30 minutes, the mold sets, capturing all intricate details. Once removed, the casting is poured, cured, and artistically hand-finished.
                                </p>
                                <p>
                                    The final sculpture is dried over 1 to 2 weeks and polished with your desired finishes.
                                </p>
                            </div>
                        </details>

                        <details className="border rounded-lg bg-white p-4 shadow-sm">
                            <summary className="cursor-pointer font-semibold text-lg">
                                Where is the casting done?
                            </summary>
                            <div className="mt-2 text-md space-y-2">
                                <p>
                                    We offer complete flexibility. Choose to visit our professional Casting Studio or let us bring the experience to you.
                                </p>
                                <p>
                                    Our mobile casting service covers most metro cities across India. Whether you're at home, a hospital, or any preferred location—we'll be there at your convenience.
                                </p>
                                <ul className="list-disc list-inside space-y-1">
                                    <li><strong>Home Comfort:</strong> No travel needed—we come to you.</li>
                                    <li><strong>Quick Setup:</strong> We only need a small space with water and power access.</li>
                                    <li><strong>Zero Mess:</strong> Our materials are easy to clean and safely handled.</li>
                                </ul>
                                <p>
                                    We’re committed to providing a calm, memorable, and stress-free casting experience—wherever you are.
                                </p>
                            </div>
                        </details>

                        <details className="border rounded-lg bg-white p-4 shadow-sm">
                            <summary className="cursor-pointer font-semibold text-lg">
                                Is it messy, and what should I wear?
                            </summary>
                            <div className="mt-2 text-md space-y-2">
                                <p>
                                    While we do our best to keep the process neat and tidy, some mess can happen—especially if we’re working with wriggly little ones. Don’t worry, it’s all part of the fun!
                                </p>
                                <p>
                                    We recommend wearing <strong>old, washable clothing</strong>—just in case. We may also provide you with an apron for extra protection during the session.
                                </p>
                                <p>
                                    Please avoid wearing anything tight over the area to be cast (like tights, socks, or snug sleeves), as these can leave impressions on the skin that may show up in the final sculpture.
                                </p>
                                <p>
                                    Your comfort and the quality of the cast are our top priorities!
                                </p>
                            </div>
                        </details>

                        <details className="border rounded-lg bg-white p-4 shadow-sm">
                            <summary className="cursor-pointer font-semibold text-lg">
                                Can multiple hands and people be cast together?
                            </summary>
                            <div className="mt-2 text-md space-y-2">
                                <p>
                                    Absolutely! Casting multiple hands together is a beautiful way to capture bonds between loved ones—be it siblings, best friends, couples, or even three generations of a family.
                                </p>
                                <p>
                                    Whether it's holding hands, stacking palms, or forming a unique gesture, each group casting tells a heartfelt story frozen in time.
                                </p>
                                <p>
                                    Need inspiration? Check out our <Link to="/gallery" className="text-[#b89d4f] underline hover:text-[#a88a3f]">Gallery</Link> to see stunning examples of family and group castings.
                                </p>
                            </div>
                        </details>

                        <details className="border rounded-lg bg-white p-4 shadow-sm">
                            <summary className="cursor-pointer font-semibold text-lg">
                                Should I cut my fingernails or have a manicure?
                            </summary>
                            <div className="mt-2 text-md space-y-2">
                                <p>
                                    Our specialized molding material is designed to capture even the finest details—including skin texture, cuticles, and fingernails—with remarkable precision.
                                </p>
                                <p>
                                    So, think of it this way: however your hands or nails appear during the session is exactly how they'll be preserved in the final cast.
                                </p>
                                <p>
                                    If you prefer a clean, groomed look, feel free to trim your nails or get a light manicure beforehand. Just make sure your hands are moisturized and free from cuts or fresh polish that could smudge.
                                </p>
                                <p>
                                    The choice is entirely yours—natural or polished, we’ll capture it just the way you are.
                                </p>
                            </div>
                        </details>

                        <details className="border rounded-lg bg-white p-4 shadow-sm">
                            <summary className="cursor-pointer font-semibold text-lg">
                                Can rings be worn during the molding process?
                            </summary>
                            <div className="mt-2 text-md space-y-2">
                                <p>
                                    Yes! Rings can absolutely be worn during the molding process and they won’t be harmed. In fact, they often add a beautiful and deeply personal touch to your life cast.
                                </p>
                                <p>
                                    Our casting material captures every fine detail—so your ring’s texture, engraving, or shape will appear clearly in the final sculpture.
                                </p>
                                <p>
                                    If you're wearing a particularly large or angular ring, please let us know in advance. We may use an alternate technique to ensure the best possible result.
                                </p>
                                <p>
                                    Planning to be cast without a ring you usually wear? Be sure to remove it at least a few hours before your appointment to avoid any indentations showing in the mold.
                                </p>
                            </div>
                        </details>

                        <details className="border rounded-lg bg-white p-4 shadow-sm">
                            <summary className="cursor-pointer font-semibold text-lg">
                                Can we order several castings from the same mold?
                            </summary>
                            <div className="mt-2 text-md space-y-2">
                                <p>
                                    Unfortunately, no. Each mold must be carefully broken apart to release your casting—making your sculpture a truly <strong>one-of-a-kind</strong> piece of art.
                                </p>
                                <p>
                                    If you’d like multiple castings, please let us know at the time of booking. This helps us plan the right approach and materials in advance, as it changes the technique and pricing slightly.
                                </p>
                                <p>
                                    In many cases—like wanting 2 to 4 baby feet—it’s actually more cost-effective and efficient to create separate unique molds than to attempt duplicating one.
                                </p>
                                <p>
                                    Your keepsake should be as personal and precise as the moment it represents—crafted with intention from the start.
                                </p>
                            </div>
                        </details>

                        <details className="border rounded-lg bg-white p-4 shadow-sm">
                            <summary className="cursor-pointer font-semibold text-lg">
                                Can you supply a base, stand, or frame for my cast?
                            </summary>
                            <div className="mt-2 text-md space-y-2">
                                <p>
                                    Yes, absolutely! We offer a variety of elegant options to display your life cast beautifully and securely.
                                </p>
                                <p>
                                    Our most popular bases come in sleek black, rich brown, and classic white finishes. We also offer clear acrylic boxes with bases for a modern, museum-style presentation.
                                </p>
                                <p>
                                    For baby hands and feet, we offer charming shadow box frames—perfect for preserving those precious early memories.
                                </p>
                                <p>
                                    Want to make it truly personal? Add an <strong>engraved nameplate</strong> with names, dates, or a short message for a meaningful finishing touch.
                                </p>
                                <p>
                                    We’re happy to design frames, stands, and wall-mounted displays to fit your unique vision. Just let us know your preferences—we love bringing creative ideas to life!
                                </p>
                            </div>
                        </details>

                        <details className="border rounded-lg bg-white p-4 shadow-sm">
                            <summary className="cursor-pointer font-semibold text-lg">
                                How do I care for my sculpture?
                            </summary>
                            <div className="mt-2 text-md space-y-2">
                                <p>
                                    Your life cast is a delicate, handcrafted piece of art—treat it with care to keep it looking its best for years to come.
                                </p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li><strong>Handle with care:</strong> Like ceramic or glass, your sculpture can break if dropped or knocked over.</li>
                                    <li><strong>No liquids:</strong> Never use cleaning sprays or water. Simply dust gently with a dry, soft cloth.</li>
                                    <li><strong>Safe placement:</strong> Keep your sculpture away from extreme temperatures, direct sunlight, and moisture-prone areas (like bathrooms).</li>
                                </ul>
                                <p>
                                    With simple, mindful care, your sculpture will remain a timeless and treasured keepsake.
                                </p>
                            </div>
                        </details>

                        <details className="border rounded-lg bg-white p-4 shadow-sm">
                            <summary className="cursor-pointer font-semibold text-lg">
                                I dropped my cast and it is broken. Can it be repaired?
                            </summary>
                            <div className="mt-2 text-md space-y-2">
                                <p>
                                    We understand how heartbreaking that can be—but don’t worry. In most cases, yes, your cast can be repaired.
                                </p>
                                <p>
                                    The possibility and cost of repair depends on the extent of the damage. We’ll need to examine the piece in person or through detailed photos to assess the condition.
                                </p>
                                <p>
                                    While some cracks and chips are easily fixable, others may require more advanced restoration techniques. Either way, we’ll always do our best to help and bring your precious keepsake back to life.
                                </p>
                                <p>
                                    If this happens, please reach out to us as soon as possible so we can guide you through the next steps.
                                </p>
                            </div>
                        </details>

                        <details className="border rounded-lg bg-white p-4 shadow-sm">
                            <summary className="cursor-pointer font-semibold text-lg">
                                Do you travel for castings?
                            </summary>
                            <div className="mt-2 text-md space-y-2">
                                <p>
                                    Yes, we do! We proudly serve all major metro cities and areas within transport-accessible regions across India.
                                </p>
                                <p>
                                    If you're located outside Delhi, Haryana or in a more remote location, we’re happy to make special arrangements. In such cases, additional travel and accommodation costs (if applicable) may be included.
                                </p>
                                <p>
                                    Once you get in touch, we’ll discuss the details and do our best to make it work—no matter where you are.
                                </p>
                                <p>
                                    Our goal is to bring the casting experience to your doorstep, with comfort and convenience at the heart of it.
                                </p>
                            </div>
                        </details>

                        <details className="border rounded-lg bg-white p-4 shadow-sm">
                            <summary className="cursor-pointer font-semibold text-lg">
                                What are your terms of payment?
                            </summary>
                            <div className="mt-2 text-md space-y-2">
                                <p>
                                    To confirm your booking, we require a 50% deposit upfront. The remaining balance is due upon completion—just before we book the delivery or when you collect your finished artwork.
                                </p>
                                <p>
                                    We accept cash as the primary mode of payment. The total cost of your casting will be clearly shared with you at the time of booking—so there are no surprises later.
                                </p>
                                <p>
                                    If an installment plan has been agreed upon, please note that the final payment must be completed before the life cast is delivered.
                                </p>
                                <p>
                                    We believe in transparency and flexibility—and are happy to answer any payment-related questions you may have.
                                </p>
                            </div>
                        </details>

                        <details className="border rounded-lg bg-white p-4 shadow-sm">
                            <summary className="cursor-pointer font-semibold text-lg">
                                Is there an age limit?
                            </summary>
                            <div className="mt-2 text-md space-y-2">
                                <p>
                                    There’s no age limit at all! Our 3D Life Casts are suitable for everyone—from newborn babies to seniors.
                                </p>
                                <p>
                                    Whether it’s capturing the tiny toes of a newborn, the loving hands of grandparents, or a special family moment, every stage of life is worth preserving beautifully.
                                </p>
                                <p>
                                    We tailor the experience based on age and comfort to ensure safety, ease, and a perfect result for all.
                                </p>
                            </div>
                        </details>

                        <details className="border rounded-lg bg-white p-4 shadow-sm">
                            <summary className="cursor-pointer font-semibold text-lg">
                                What if my child won’t stay still for a cast?
                            </summary>
                            <div className="mt-2 text-md space-y-2">
                                <p>
                                    Babies naturally love to wiggle their toes and sometimes kick during the casting process—it's totally normal!
                                </p>
                                <p>
                                    In most cases, we can successfully complete the casting even with a very active little one. On days when your child is extra fussy or restless, we offer a <strong>free second casting</strong> of the same foot or hand to ensure the final piece is flawless.
                                </p>
                                <p>
                                    Occasionally, if it becomes impossible to finish the casting properly, we’ll prioritize quality and reschedule your appointment for a better time.
                                </p>
                                <p>
                                    A sleeping baby makes the perfect model, so we’ll do our best to arrange the casting around your child’s schedule to make the experience as smooth and stress-free as possible.
                                </p>
                            </div>
                        </details>

                        <details className="border rounded-lg bg-white p-4 shadow-sm">
                            <summary className="cursor-pointer font-semibold text-lg">
                                What is the best time of day to take a cast of my baby / child?
                            </summary>
                            <div className="mt-2 text-md space-y-2">
                                <p>
                                    The best time to take a cast is when your little one is calm and relaxed—often after or during feeding, or during a nap.
                                </p>
                                <p>
                                    Many babies stay peacefully asleep throughout the entire process, which helps us capture the perfect cast with minimal fuss.
                                </p>
                                <p>
                                    Bringing along favorite toys, comforters, or pacifiers can also be great distractions to keep your child comfortable and occupied during casting.
                                </p>
                                <p>
                                    We’ll work with you to create a relaxed and enjoyable experience for both you and your child.
                                </p>
                            </div>
                        </details>
                    </div>
                </div>
                {/* Booking Form Section */}
                <BookingForm />
            </div>
        </div>
        <CallToAction />
        <Footer />
        </div>
    );
};

export default FAQ;
