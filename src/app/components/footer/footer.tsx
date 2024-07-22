export default function Footer() {
  return (
    <footer className="w-full max-w-screen-2xl mx-auto bg-light-background rounded-lg shadow m-4 dark:bg-dark-background">
      <div className="p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a href="https://backcountrycreative.com" className="hover:underline">
            Backcountry Creative
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Portfolio
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
