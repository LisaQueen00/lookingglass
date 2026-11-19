import type { Friend } from "../../types/friend"

type FriendCardProps = {
  friend: Friend
}

function FriendCard({ friend }: FriendCardProps) {
  return (
    <article
      className="
        group aspect-square
        flex flex-col items-center justify-between
        rounded-2xl border border-[#DCEAF6]
        bg-white p-8
        shadow-sm
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-lg
      "
    >
      {/* 圆形徽章 */}
      <div className="flex min-h-0 flex-1 items-center justify-center">
        <div
          className="
            relative aspect-square
            w-50 max-w-full
            rounded-full 
            bg-[linear-gradient(135deg,#8FAFC7_0%,#FFFFFF_23%,#B4CEE2_42%,#5E7895_70%,#D8E8F4_90%)]
            shadow-[0_6px_16px_rgba(48,91,128,0.25)]
            transition-transform duration-300
            group-hover:rotate-3 group-hover:scale-105
          "
        >
          <div className="relative h-full w-full overflow-hidden rounded-full bg-[#E1EFF9]">
            <img
              src={friend.avatar}
              alt={`${friend.name} 的头像`}
              className="h-full w-full object-cover"
              loading="lazy"
            />

            {/* 上半部分弧形高光 */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none absolute
                inset-x-[7%] top-[5%] h-[42%]
                rounded-[50%_50%_45%_45%]
                bg-linear-to-b
                from-white/60 via-white/20 to-transparent
              "
            />

            {/* 玻璃表面反光与阴影 */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none absolute inset-0 rounded-full
                bg-linear-to-br
                from-white/20 via-transparent to-slate-900/20
                ring-1 ring-inset ring-white/60
              "
            />
          </div>
        </div>
      </div>

      {/* 朋友信息 */}
      <div className="w-full text-center">
        <h3 className="truncate text-2xl font-cinzel text-[#345B7A]">
          {friend.name}
        </h3>

        <p className="mt-1 truncate text-xl font-notescan text-slate-500">
          {friend.affiliation}
        </p>

        {/* 站点图标链接 */}
        <div className="mt-3 flex items-center justify-center gap-4">
          {friend.gitlink && (
            <a
              href={friend.gitlink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`访问 ${friend.name} 的 Git 主页`}
              title="Git"
              className="
                text-[#5E85A5]
                transition-colors duration-200
                hover:text-[#345B7A]
              "
            >
              <GitIcon />
            </a>
          )}

          {friend.bloglink && (
            <a
              href={friend.bloglink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`访问 ${friend.name} 的博客`}
              title="Blog"
              className="
                text-[#5E85A5]
                transition-colors duration-200
                hover:text-[#345B7A]
              "
            >
              <BlogIcon />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

/* GitHub Logo */
function GitIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .8a11.2 11.2 0 0 0-3.54 21.82c.56.1.76-.24.76-.54v-2.12c-3.1.67-3.76-1.32-3.76-1.32-.5-1.27-1.24-1.61-1.24-1.61-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 .1.8.77 2.65.52.2-.73.5-1.23.9-1.51-2.48-.28-5.1-1.24-5.1-5.54 0-1.22.44-2.22 1.16-3-.12-.29-.5-1.42.11-2.95 0 0 .94-.3 3.08 1.14a10.6 10.6 0 0 1 5.6 0c2.14-1.45 3.07-1.14 3.07-1.14.61 1.53.23 2.66.11 2.95.73.78 1.16 1.78 1.16 3 0 4.3-2.62 5.25-5.12 5.53.52.45.98 1.32.98 2.66v3.94c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z" />
    </svg>
  )
}

/* Blog Icon */
function BlogIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 8h10M7 12h10M7 16h6" />
    </svg>
  )
}

export default FriendCard