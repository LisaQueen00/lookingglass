import { useEffect, useState } from "react"
import Header from "../components/sharing/Header"
import Showcase from "../components/sharing/Showcase"
// import Pagecontent from "../components/sharing/Pagecontent"
import FriendCard from "../components/elements/FriendCard"
import type { Friend } from "../types/friend"

function Friends() {
    const [friends, setFriends] = useState<Friend[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const controller = new AbortController()

        async function loadFriends() {
            try {
                const response = await fetch(
                    "/content/friends/meta/meta.json",
                    { signal: controller.signal }
                )

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`)
                }

                const data: Friend[] = await response.json()
                setFriends(data)
            } catch (err) {
                if (controller.signal.aborted) return

                console.error("Failed to load friends:", err)
                setError("友链数据加载失败")
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false)
                }
            }
        }

        loadFriends()

        return () => controller.abort()
    }, [])

    return (
        <main
            className="
                w-full max-w-420
                mx-auto
                px-4 md:px-8
                flex flex-col gap-6
            "
        >
            <Header />

            <Showcase>
                {loading ? (
                    <p className="py-12 text-center text-slate-400">
                        正在加载友链……
                    </p>
                ) : error ? (
                    <p className="py-12 text-center text-red-400">
                        {error}
                    </p>
                ) : friends.length === 0 ? (
                    <p className="py-12 text-center text-slate-400">
                        友链收藏册还是空的喵……
                    </p>
                ) : (
                    <div
                        className="
                            grid grid-cols-1
                            sm:grid-cols-2
                            lg:grid-cols-3
                            xl:grid-cols-4
                            gap-6
                        "
                    >
                        {friends.map((friend) => (
                            <FriendCard
                                key={friend.name}
                                friend={friend}
                            />
                        ))}
                    </div>
                )}
            </Showcase>

            {/* <Pagecontent>
            </Pagecontent> */}
        </main>
    )
}

export default Friends