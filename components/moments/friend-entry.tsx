interface FriendEntryProps {
  time: string
  friend: {
    name: string
    avatar: string
  }
  description: string
  images?: string[]
}

export function FriendEntry({
  time,
  friend,
  description,
  images,
}: FriendEntryProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-1">
        <div className="bg-surface-container-lowest rounded-xl overflow-hidden card-shadow transition-all hover:card-shadow-hover">
          <div className="p-6 flex gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
              <img
                alt={friend.name}
                className="w-full h-full object-cover"
                src={friend.avatar}
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-sans text-xl font-medium text-primary">
                  {friend.name}
                </h3>
                <time className="font-mono text-xs text-secondary">{time}</time>
              </div>
              <p className="font-sans text-base text-secondary leading-relaxed italic mb-6">
                {`"${description}"`}
              </p>
              {images && images.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {images.map((image, index) => (
                    <img
                      key={index}
                      alt={`Photo ${index + 1}`}
                      className="rounded-lg aspect-square object-cover"
                      src={image}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
