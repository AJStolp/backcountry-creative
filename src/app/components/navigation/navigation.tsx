import NavigationItem from "../interfaces/navigation-item";

async function getData(): Promise<NavigationItem[]> {
  const res = await fetch("http://localhost:5000/api/navigation");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Navigation() {
  const data: NavigationItem[] = await getData();

  return (
    <nav className="w-full max-w-screen-2xl mx-auto sticky top-0">
      <div className="flex flex-wrap items-center justify-between mx-auto">
        <a
          href="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <div className="rounded-full bg-transparent dark:bg-light-background">
            <img
              src="/backcountry-creative-logo-no-bg.png"
              className="h-16 max-h-16"
              alt="Backwoods Creative Logo"
            />
          </div>

          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Backcountry Creative
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg xl:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full xl:block xl:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 xl:p-0 mt-4 border border-gray-100 rounded-lg xl:flex-row xl:space-x-8 rtl:space-x-reverse xl:mt-0 xl:border-0 dark:border-gray-700">
            {data.map((e) => (
              <li key={e.key}>
                <a
                  href="#"
                  className="block py-2 px-3 text-light-text rounded xl:p-0 dark:text-dark-text"
                  aria-current="page"
                >
                  {e.linkTitle}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
