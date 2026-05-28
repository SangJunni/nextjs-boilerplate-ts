interface Friend {
  name: string
  avatar: string
}

interface TimelineEntryProps {
  time: string
  image?: string
  description: string
  location?: string
  friends?: Friend[]
}

export function TimelineEntry({
  time,
  image,
  description,
  location,
  friends,
}: TimelineEntryProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-1">
        <div className="bg-surface-container-lowest rounded-xl overflow-hidden card-shadow transition-all hover:card-shadow-hover hover:scale-[1.01] duration-300">
          {image && (
            <img
              alt="Moment"
              className={`w-full object-cover ${friends ? "aspect-[21/9]" : "aspect-[4/3]"}`}
              src={image}
            />
          )}
          <div className="p-6">
            {friends && friends.length > 0 && (
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {friends.map((friend, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full border-2 border-white overflow-hidden"
                      >
                        <img
                          alt={friend.name}
                          className="w-full h-full object-cover"
                          src={friend.avatar}
                        />
                      </div>
                    ))}
                  </div>
                  <span className="font-mono text-xs text-secondary">
                    With {friends.map((f) => f.name).join(" and ")}
                  </span>
                </div>
                <time className="font-mono text-xs text-secondary">{time}</time>
              </div>
            )}
            
            <p className="font-sans text-lg leading-7 text-primary mb-4">
              {description}
            </p>
            
            {!friends && (
              <div className="flex justify-between items-center">
                {location && (
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-secondary text-sm">
                      location_on
                    </span>
                    <span className="font-mono text-xs text-secondary">{location}</span>
                  </div>
                )}
                <time className="font-mono text-xs text-secondary bg-surface-container px-2 py-1 rounded">
                  {time}
                </time>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
