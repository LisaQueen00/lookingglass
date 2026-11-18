import { Link } from 'react-router'

type CardData = {
  slug: string
  title?: string
  date?: string
  summary?: string
  cover?: string
  tags?: string[]
}

type ContentCardProps = {
  data: CardData
  basePath: string
}



function ContentCard (props: ContentCardProps){



    return (
        <Link 
            to={`${props.basePath}/${props.data.slug}`}
            className="
                group flex w-full gap-5
                rounded-xl
                border border-[#DCEAF6]
                bg-white p-4
                transition-[transform,box-shadow,border-color,background-color]
                duration-1000 ease-out
                hover:-translate-y-0.5
                hover:shadow-md
                hover:border-[#A8CBEA]
                hover:bg-blue-50/40
                h-45
            ">
            <div className="w-1/3 shrink-0 overflow-hidden rounded-lg">
                <img src="" alt="" className="w-full h-full object-cover" />

            </div>

            <div className="flex-1 min-w-0 flex flex-col justify-start gap-4">
            
                {/* 标题 */}
                <h2 className="text-xl font-semibold text-slate-700 group-hover:text-blue-600">
                    {props.data.title}
                </h2>

                {/* 日期 */}
                <time className="text-xs text-slate-400">
                    {props.data.date}
                </time>

                {/* 摘要 */}
                <p className="text-sm leading-6 text-slate-500 line-clamp-2">
                    {props.data.summary}
                </p>

                {/* 标签 */}
                <div className="flex flex-wrap gap-2">
                    {props.data.tags?.map((tag) => (
                    <span
                        key={tag}
                        className="rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-600"
                    >
                        {tag}
                    </span>
                    ))}
                </div>
            </div>
        </Link>
    )
}



export default ContentCard