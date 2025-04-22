import Message from '@/components/message';

const EXAMPLE_ANSWER = `You should visit the Dragon Bridge in Da Nang for several compelling reasons:

* **Unique Architecture:** It's not just a bridge; it's the **world's largest dragon-shaped steel bridge**, a stunning and innovative design inspired by the Ly Dynasty, symbolizing power, nobility, and good fortune in Vietnamese culture. Its golden curves and impressive scale make it a sight to behold both day and night.
* **Spectacular Fire and Water Show:** Every **Friday, Saturday, and Sunday night at 9:00 PM**, the dragon comes alive, breathing fire and spraying water from its mouth in a captivating 15-minute performance. This free show is a major highlight and a unique experience you won't find everywhere.
* **Dazzling Nighttime Display:** After sunset, the bridge is illuminated by thousands of **colorful LED lights** that continuously change, creating a vibrant and mesmerizing spectacle that reflects beautifully on the Han River. It's a perfect backdrop for an evening stroll or photos.
* **Cultural Symbolism:** The bridge is more than just infrastructure; it's a **symbol of Da Nang's growth, development, and aspirations**. Its design and the fire/water show celebrate Vietnamese culture and the city's dynamic spirit.
* **Strategic Location & Accessibility:** The bridge crosses the Han River, providing a vital link and the **shortest route from Da Nang International Airport to the city center and popular beaches** like My Khe. It's easily accessible and a central landmark in Da Nang.
* **Great Photo Opportunities:** Whether bathed in sunlight, illuminated at night, or during the fire and water show, the Dragon Bridge offers **fantastic photo opportunities** from various vantage points along the riverbanks and even from the bridge itself (when pedestrian access is allowed).
* **Central to City Life:** The area around the Dragon Bridge is lively, with **riverside cafes, restaurants, and walking streets**, making it a great place to soak in the local atmosphere and enjoy the city views.

In short, the Dragon Bridge is a must-see attraction in Da Nang due to its impressive design, unique weekend performances, vibrant nighttime presence, and cultural significance. It's an unforgettable experience that truly embodies the modern and dynamic spirit of the city.`;

export default function ChatPage() {
  return (
    <div className='flex h-full flex-row items-stretch'>
      <div
        id='history'
        className='bg-accent text-accent-foreground h-full min-h-full w-full max-w-xs p-4'
      >
        History
      </div>
      <div id='chat' className='flex w-full justify-center py-4'>
        <div className='flex w-full max-w-4xl flex-col gap-4'>
          <Message
            isUserMessage
            content={
              'Please briefly explain why I should visit the Dragon Bridge in Da Nang.'
            }
          />
          <Message content={EXAMPLE_ANSWER} />
        </div>
      </div>
    </div>
  );
}
