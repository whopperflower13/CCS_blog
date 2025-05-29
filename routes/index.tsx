// routes/index.tsx (Your new landing page)


import { h } from "preact"; // Import h from preact for JSX
import { Head } from "$fresh/runtime.ts"; // For adding meta tags to the HTML head

export default function LandingPage() {
  return (
    <>
      <Head>
        <title>Welcome to My Blog!</title>
        <meta name="description" content="Discover thoughts, insights, and updates on various topics." />
        {/* You can add more meta tags here for SEO, social sharing etc. */}
      </Head>
      <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 text-gray-800 p-4">
        {/* Main Content Area */}
        <div class="text-center max-w-2xl px-6 py-12 bg-white rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105">
          <h1 class="text-6xl font-extrabold text-blue-700 mb-4 animate-fade-in-down">
            Welcome to My Blog
          </h1>
          <p class="text-xl text-gray-600 mb-8 leading-relaxed animate-fade-in">
            Dive into a collection of articles, insights, and stories.
            From interactive media to coding adventures, find something new to explore.
          </p>
          
          {/* Call to Action Button */}
          <a
            href="./blog" // This links to your new blog index page
            class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-md transition-colors duration-300 transform hover:scale-105 animate-bounce-in"
          >
            Explore the Blog
          </a>
        </div>

        {/* Optional: Footer or attribution */}
        <footer class="mt-12 text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} My Awesome Blog. All rights reserved.
        </footer>
      </div>

      {/* Optional: Simple CSS animations for a smoother feel */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes bounceIn {
          0%, 20%, 40%, 60%, 80%, 100% {
            transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
          }
          0% { opacity: 0; transform: scale3d(.3, .3, .3); }
          20% { transform: scale3d(1.1, 1.1, 1.1); }
          40% { transform: scale3d(.9, .9, .9); }
          60% { opacity: 1; transform: scale3d(1.03, 1.03, 1.03); }
          80% { transform: scale3d(.97, .97, .97); }
          100% { opacity: 1; transform: scale3d(1, 1, 1); }
        }
        .animate-fade-in-down { animation: fadeInDown 1s ease-out forwards; }
        .animate-fade-in { animation: fadeIn 1.5s ease-out forwards; }
        .animate-bounce-in { animation: bounceIn 1s ease-out forwards; }
      `}} />
    </>
  );
}