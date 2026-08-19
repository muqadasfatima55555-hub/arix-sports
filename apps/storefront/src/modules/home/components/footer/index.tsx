import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function Footer() {
  return (
    <footer className="bg-[#08111F] text-white">

      <div className="content-container border-t border-white/10 py-12">

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Logo */}

          <div>

            <img
              src="/logo-white.png"
              alt="Arix"
              className="h-12"
            />

            <p className="mt-5 text-gray-400 leading-7 text-sm">
              Performance sportswear engineered for athletes who never stop.
            </p>

            <div className="flex gap-4 mt-6 text-gray-400">

              <span>📷</span>

              <span>📘</span>

              <span>🎵</span>

              <span>▶️</span>

            </div>

          </div>

          {/* Shop */}

          <div>

            <h3 className="uppercase tracking-[3px] text-sm font-semibold mb-5">
              Shop
            </h3>

            <ul className="space-y-3 text-gray-400">

              <li><LocalizedClientLink href="/store">Men</LocalizedClientLink></li>

              <li><LocalizedClientLink href="/store">Women</LocalizedClientLink></li>

              <li><LocalizedClientLink href="/store">Sportswear</LocalizedClientLink></li>

              <li><LocalizedClientLink href="/collections">New Arrivals</LocalizedClientLink></li>

              <li><LocalizedClientLink href="/collections">Collections</LocalizedClientLink></li>

            </ul>

          </div>

          {/* Company */}

          <div>

            <h3 className="uppercase tracking-[3px] text-sm font-semibold mb-5">
              Company
            </h3>

            <ul className="space-y-3 text-gray-400">

              <li>About Us</li>

              <li>Our Story</li>

              <li>Sustainability</li>

              <li>Careers</li>

              <li>Press</li>

            </ul>

          </div>

          {/* Support */}

          <div>

            <h3 className="uppercase tracking-[3px] text-sm font-semibold mb-5">
              Support
            </h3>

            <ul className="space-y-3 text-gray-400">

              <li>Help Center</li>

              <li>Size Guide</li>

              <li>Shipping</li>

              <li>Returns</li>

              <li>Track Order</li>

            </ul>

          </div>

          {/* Customer */}

          <div>

            <h3 className="uppercase tracking-[3px] text-sm font-semibold mb-5">
              Customer Care
            </h3>

            <ul className="space-y-3 text-gray-400">

              <li>Contact Us</li>

              <li>FAQs</li>

              <li>Privacy Policy</li>

              <li>Terms & Conditions</li>

            </ul>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-6">

          <p className="text-sm text-gray-500">
            © 2026 ARIX SPORTS. All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-gray-300">

            <span className="font-semibold">VISA</span>

            <span>Mastercard</span>

            <span>PayPal</span>

            <span>Apple Pay</span>

            <span>G Pay</span>

          </div>

        </div>

      </div>

    </footer>
  )
}