export default function Marquee({ items }: { items: string[] }) {
  return (
  <div className="flex overflow-x-hidden border-b-2 border-t-2 border-border bg-secondary-background text-foreground font-base py-4">
  <div className="flex whitespace-nowrap animate-marquee">
    {[...items, ...items, ...items].map((item, index) => (
      <div key={index} className="mx-4 flex items-center shrink-0">
        <img
          src={item}
          alt=""
          className="w-20 md:w-30 h-auto object-contain"
        />
      </div>
    ))}
  </div>
</div>



  )
}