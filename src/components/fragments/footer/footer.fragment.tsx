import React from'react';
import './footer.page.scss';




export function FooterFragment(props: any) {
  const currentYear = (new Date()).getFullYear();


  return (
    <footer className="footer">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="w-full sm:w-2/3">
          <p className="text-white font-bold text-2xl">AVENGER &copy; {currentYear}</p>
        </div>
        <div className="w-full sm:w-1/3">

        </div>
      </div>
    </footer>
  );
}