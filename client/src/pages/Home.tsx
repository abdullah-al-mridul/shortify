import { useEffect, useState } from "react";
import useLinkStore from "../store/linkStore";
import useAuthStore from "../store/authStore";

const Home = () => {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { authUser: authenticated } = useAuthStore();

  const { addLink, getLinks, links: userLinks, deleteLink } = useLinkStore();
  useEffect(() => {
    getLinks();
  }, []);
  useEffect(() => {
    console.log(userLinks);
  }, [userLinks]);
  useEffect(() => {
    console.log(authenticated);
  }, [authenticated]);
  const handleShorten = async () => {
    addLink(url, setShortenedUrl);
  };

  const handleDelete = (id: string) => {
    deleteLink(id);
  };
  return (
    <div className="bg-[#1B1B24]">
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 bg-[#232332] rounded-full text-yellow-400 text-sm mb-6">
            Made by Abdullah Al Mridul
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-yellow-400">Transform</span>{" "}
            <span className="text-white">Your Links</span>
            <br />
            <span className="text-white">Into Smart URLs</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Create powerful, trackable short links that help you understand your
            audience better.
          </p>
        </div>

        {/* URL Input Section */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#232332] p-8 rounded-lg border border-[#2A2A3C]">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste your long URL here..."
                className="flex-1 px-6 py-4 bg-[#1B1B24] border border-[#2A2A3C] rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-400"
              />
              <button
                onClick={handleShorten}
                disabled={isLoading}
                className="px-8 py-4 bg-yellow-400 text-black rounded font-medium hover:bg-yellow-300 disabled:opacity-50 transition-all duration-300 flex items-center gap-2"
              >
                {isLoading ? "Processing..." : "Shorten URL"}
              </button>
            </div>

            {/* Results Section */}
            {shortenedUrl && (
              <div className="mt-6 p-6 bg-[#1B1B24] rounded-lg border border-[#2A2A3C]">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                      </svg>
                    </div>
                    <span className="text-indigo-600 font-medium flex-1 truncate">
                      {shortenedUrl}
                    </span>
                  </div>
                  <button
                    onClick={() => navigator.clipboard.writeText(shortenedUrl)}
                    className="w-full md:w-auto px-4 py-2 text-sm bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-600 hover:from-indigo-500/20 hover:to-purple-500/20 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                      />
                    </svg>
                    Copy to Clipboard
                  </button>
                </div>
              </div>
            )}

            {/* User Links Section */}
            {authenticated && (
              <div className="mt-8">
                <div className="bg-[#1B1B24] rounded-lg border border-[#2A2A3C]">
                  <div className="px-6 py-4 border-b border-[#2A2A3C]">
                    <h3 className="text-lg font-semibold text-white">
                      Your Links
                    </h3>
                  </div>
                  <div className="p-4 space-y-4">
                    {userLinks.map((link) => (
                      <div
                        key={link._id}
                        className="bg-[#232332] p-4 rounded-lg border border-[#2A2A3C] hover:border-yellow-400/50 transition-all duration-300"
                      >
                        {/* Full Link */}
                        <div className="mb-3">
                          <div className="text-sm font-medium text-white mb-1">
                            Full Link
                          </div>
                          <div className="text-sm text-gray-400 truncate">
                            {link.fullLink}
                          </div>
                        </div>

                        {/* Short Link */}
                        <div className="mb-3">
                          <div className="text-sm font-medium text-white mb-1">
                            Short Link
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-indigo-600 font-medium">
                              {link.shortLink}
                            </span>
                            <button
                              onClick={() =>
                                navigator.clipboard.writeText(link.shortLink)
                              }
                              className="text-gray-400 hover:text-indigo-600 transition-colors duration-200"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end">
                          <button
                            onClick={() => handleDelete(link._id)}
                            className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
