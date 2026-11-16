import { useState } from 'react'
import innerWorldImage_l from './assets/world-gate/inner-world-l.png'
import outerWorldImage_r from './assets/world-gate/outer-world-r.png'
import innerWorldImage_r from './assets/world-gate/inner-world-r.png'
import outerWorldImage_l from './assets/world-gate/outer-world-l.png'
import { useNavigate } from 'react-router'


type ActiveWorld = 'inner' | 'outer' | null

function WorldGate() {
  const [activeWorld, setActiveWorld] = useState<ActiveWorld>(null)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const navigate = useNavigate()
  return (
    <main
    className={`
        relative isolate flex min-h-screen items-center justify-center overflow-hidden
        transition-colors duration-500
        ${theme === 'dark' ? 'bg-[#1c1c21] text-[#f1eef4]' : 'bg-[#fcfbff] text-[#252630]'}
        ${theme === 'dark'
        ? '[--world-center:#1c1c21]'
        : '[--world-center:#ffffff]'
}
    `}
    >
        <button
        type="button"
        aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        aria-pressed={theme === 'dark'}
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className={`
            absolute top-6 right-6 z-30
            flex h-10 w-10 items-center justify-center
            rounded-full border
            text-xl cursor-pointer
            transition-colors duration-300
            ${theme === 'dark'
            ? 'border-white/20 bg-white/10 text-white hover:bg-white/20'
            : 'border-black/10 bg-white/70 text-slate-700 hover:bg-white'
            }
            ${theme === 'dark'
            ? '[--world-center:#1c1c21]'
            : '[--world-center:#ffffff]'
            }
        `}
        >
        {theme === 'light' ? '☾' : '☀'}
        </button>
      {/* 基础渐变：始终存在，保持很轻的神秘感 */}
        {/* 左侧基础渐变 */}
        <div
        className={`
        pointer-events-none absolute inset-y-0 left-0 w-1/2 opacity-100
        ${
            theme === 'dark'
            ? 'bg-[#1c1c21]'
            : 'bg-world-left'
        }
        ${
            activeWorld !== 'outer'
            ? '[--world-center:#ffffff] [--world-middle:#fff8fb] [--world-edge:#fde7f1]'
            : '[--world-center:#ffffff] [--world-middle:#f8fbff] [--world-edge:#e7f3ff]'
        }
        `}
        >
        <img
            className={`
            absolute top-0 left-0
            transition-opacity duration-1000
            ${activeWorld === 'inner' ? 'opacity-50' : 'opacity-0'}
            `}
            src={innerWorldImage_l}
            alt=""
        />

        <img
            className={`
            absolute top-0 left-0
            transition-opacity duration-1000
            ${activeWorld === 'outer' ? 'opacity-50' : 'opacity-0'}
            `}
            src={outerWorldImage_l}
            alt=""
        />
        </div>

        {/* 右侧基础渐变 */}
        <div
        className={`
        pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-100
        ${
            theme === 'dark'
            ? 'bg-[#1c1c21]'
            : 'bg-world-right'
        }
        ${
            activeWorld !== 'inner'
            ? '[--world-center:#ffffff] [--world-middle:#f8fbff] [--world-edge:#e7f3ff]'
            : '[--world-center:#ffffff] [--world-middle:#fff8fb] [--world-edge:#fde7f1]'
        }
        `}
        >
        <img
            className={`
            absolute top-0 right-0
            transition-opacity duration-1000
            ${activeWorld === 'outer' ? 'opacity-50' : 'opacity-0'}
            `}
            src={outerWorldImage_r}
            alt=""
        />

        <img
            className={`
            absolute top-0 right-0
            transition-opacity duration-1000
            ${activeWorld === 'inner' ? 'opacity-50' : 'opacity-0'}
            `}
            src={innerWorldImage_r}
            alt=""
        />
        </div>


      {/* 球体与外光晕的共同容器 */}
        <div className="relative z-10 h-80 w-80">

        {/* 暗夜主题：球体外光晕 */}
        <div
            className={`
            pointer-events-none absolute -inset-16 rounded-full
            bg-[radial-gradient(circle,var(--orb-glow)_0%,transparent_70%)]
            transition-[--orb-glow] duration-700 ease-in-out
            ${
                theme === 'dark'
                ? activeWorld === 'inner'
                    ? '[--orb-glow:rgba(244,114,182,0.4)]'
                    : activeWorld === 'outer'
                    ? '[--orb-glow:rgba(56,189,248,0.4)]'
                    : '[--orb-glow:rgba(203,213,225,0.12)]'
                : '[--orb-glow:transparent]'
            }
            `}
        />

      {/* 中央球体 */}
        <div
        className="relative h-80 w-80 overflow-hidden rounded-full"
        onMouseLeave={() => setActiveWorld(null)} 
        onClick={()=>{
            if (activeWorld=='inner') navigate('/game')
            if (activeWorld=='outer') navigate('/blog')
        }}
        >
            {/* 初始状态：完整的粉白蓝球体 */}
            <div
                className="
                pointer-events-none absolute inset-0
                bg-[linear-gradient(90deg,#f5b9d2_0%,#ffffff_50%,#b8ddfa_100%)]
                "
            />

            {/* 白色中心：遮盖中间区域，让颜色集中在外圈 */}
            <div
                className="
                pointer-events-none absolute inset-0
                bg-[radial-gradient(circle_closest-side_at_center,#ffffff_0%,#ffffff_68%,transparent_100%)]
                "
            />

            {/* Hover 左侧：完整粉白球体 */}
            <div
                className={`
                flex items-center justify-center
                pointer-events-none absolute inset-0
                bg-[radial-gradient(circle_closest-side_at_center,#ffffff_0%,#ffffff_68%,#ffe4ef_82%,#f5b9d2_100%)]
                transition-opacity duration-700 ease-in-out
                ${activeWorld === 'inner' ? 'opacity-100' : 'opacity-0'}
                `}>
                <span className={`
                    text-center text-lg font-semibold text-rose-400
                    transition-opacity duration-250 ease-in-out
                    ${activeWorld === 'inner' ? 'opacity-100' : 'opacity-0'}`}>🩷 Cat's Nest</span>

            </div>
            

            {/* Hover 右侧：完整白蓝球体 */}
            <div
                className={`
                flex items-center justify-center
                pointer-events-none absolute inset-0
                bg-[radial-gradient(circle_closest-side_at_center,#ffffff_0%,#ffffff_68%,#e0f1ff_82%,#b8ddfa_100%)]
                transition-opacity duration-700 ease-in-out
                ${activeWorld === 'outer' ? 'opacity-100' : 'opacity-0'}
                `}
            >
                <span className={`
                    text-center text-lg font-semibold text-sky-500
                    transition-opacity duration-250 ease-in-out
                    ${activeWorld === 'outer' ? 'opacity-100' : 'opacity-0'}`}>🩵 Blog</span>
            </div>

            {/* 透明的交互区域：左右各占半个球体 */}
            <div className="relative z-10 flex h-full w-full">
                <div
                onMouseEnter={() => setActiveWorld('inner')}
                className="flex h-full w-1/2 cursor-pointer items-center justify-center"
                >
                <span
                    className={`
                    text-center text-lg font-semibold text-rose-400
                    transition-opacity duration-250 ease-in-out
                    ${activeWorld === null ? 'opacity-100' : 'opacity-0'}
                    `}
                >
                    🩷 Cat's Nest
                </span>
                </div>

                <div
                onMouseEnter={() => setActiveWorld('outer')}
                className="flex h-full w-1/2 cursor-pointer items-center justify-center"
                >
                <span
                    className={`
                    text-center text-lg font-semibold text-sky-500
                    transition-opacity duration-250 ease-in-out
                    ${activeWorld === null ? 'opacity-100' : 'opacity-0'}
                    `}
                >
                    🩵 Blog
                </span>
                </div>
            </div>
          </div>    
        </div>              
    </main>
  )
}

export default WorldGate