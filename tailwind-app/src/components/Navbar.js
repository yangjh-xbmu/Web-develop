import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Web前端技术课程练习
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="hover:text-gray-300">
              首页
            </Link>
          </li>
          <li>
            <Link href="/exercises" className="hover:text-gray-300">
              练习
            </Link>
          </li>
          <li>
            <Link href="/github-stats" className="hover:text-gray-300">
              GitHub 统计
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}