export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-8">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Branding */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-orange-500">simplilearn</span>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-400">
            © {currentYear} Simplilearn. All rights reserved.
          </div>

          {/* Links (optional) */}
          <div className="flex items-center gap-6 text-sm text-gray-400">
            {/* Add footer links if needed */}
          </div>
        </div>
      </div>
    </footer>
  );
}
