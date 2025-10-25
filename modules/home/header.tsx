import Link from "next/link";
import Image from "next/image";
import UserButton from "../auth/components/user-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Header() {
  return (
    <>
      <div className="sticky top-0 left-0 right-0 z-50">
        <div className="bg-white dark:bg-black w-full">
          <div className="flex items-center justify-center w-full flex-col">
            <div
              className={`
                flex items-center justify-between
                bg-gradient-to-b from-white/95 via-gray-50/95 to-white/95
                dark:from-zinc-950/95 dark:via-zinc-900/95 dark:to-zinc-950/95
                shadow-[0_2px_20px_-2px_rgba(131,183,222,0.15)]
                dark:shadow-[0_2px_20px_-2px_rgba(116,255,158,0.1)]
                backdrop-blur-md
                border-x border-b 
                border-[#83B7DE]/20 dark:border-[#74FF9E]/20
                w-full sm:min-w-[800px] sm:max-w-[1200px]
                rounded-b-[28px]
                px-4 py-2.5
                relative
                transition-all duration-300 ease-in-out
                hover:shadow-[0_4px_24px_-2px_rgba(131,183,222,0.2)]
                dark:hover:shadow-[0_4px_24px_-2px_rgba(116,255,158,0.15)]
              `}
            >
              <div className="relative z-10 flex items-center justify-between w-full gap-2">
                {/* Logo Section with Navigation Links */}
                <div className="flex items-center gap-6 justify-center">
                  <Link
                    href="/"
                    className="flex items-center gap-2 justify-center group"
                  >
                    <div className="transition-transform duration-300 group-hover:scale-110">
                      <Image
                        src={"/logo.svg"}
                        alt="Logo"
                        height={60}
                        width={60}
                      />
                    </div>

                    <span className="hidden sm:block font-extrabold text-lg bg-gradient-to-r from-[#256DA4] to-[#83B7DE] dark:from-[#83B7DE] dark:to-[#74FF9E] bg-clip-text text-transparent transition-all duration-300">
                      Codyn IDE
                    </span>
                  </Link>
                  <span className="text-[#83B7DE]/30 dark:text-[#74FF9E]/30">
                    |
                  </span>

                  {/* Desktop Navigation Links */}
                  <div className="hidden sm:flex items-center gap-4">
                    <Link
                      href="/docs/components/background-paths"
                      className="text-sm text-[#256DA4] hover:text-[#83B7DE] dark:text-[#83B7DE] dark:hover:text-[#74FF9E] transition-all duration-300 font-medium relative group"
                    >
                      Docs
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#83B7DE] to-[#74FF9E] group-hover:w-full transition-all duration-300"></span>
                    </Link>

                    <Link
                      href="https://codesnippetui.pro/templates?utm_source=codesnippetui.com&utm_medium=header"
                      target="_blank"
                      className="text-sm text-[#256DA4] hover:text-[#83B7DE] dark:text-[#83B7DE] dark:hover:text-[#74FF9E] transition-all duration-300 font-medium flex items-center gap-2 relative group"
                    >
                      API
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#83B7DE] to-[#74FF9E] group-hover:w-full transition-all duration-300"></span>
                      <span className="text-[#74FF9E] dark:text-[#74FF9E] border border-[#74FF9E] bg-[#74FF9E]/10 rounded-lg px-1.5 py-0.5 text-xs font-semibold animate-pulse">
                        New
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Right side items */}
                <div className="hidden sm:flex items-center gap-3">
                  <span className="text-[#83B7DE]/30 dark:text-[#74FF9E]/30">
                    |
                  </span>
                  <ThemeToggle />
                  <UserButton />
                </div>

                {/* Mobile Navigation */}
                <div className="flex sm:hidden items-center gap-4">
                  <Link
                    href="/docs/components/action-search-bar"
                    className="text-sm text-[#256DA4] hover:text-[#83B7DE] dark:text-[#83B7DE] dark:hover:text-[#74FF9E] transition-all duration-300 font-medium"
                  >
                    Docs
                  </Link>
                  <Link
                    href="/pricing"
                    className="text-sm text-[#256DA4] hover:text-[#83B7DE] dark:text-[#83B7DE] dark:hover:text-[#74FF9E] transition-all duration-300 font-medium"
                  >
                    API
                  </Link>
                  <ThemeToggle />
                  <UserButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}