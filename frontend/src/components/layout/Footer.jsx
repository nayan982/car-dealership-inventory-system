import { Link } from "react-router-dom";
import {
    FiInstagram,
    FiTwitter,
    FiYoutube,
} from "react-icons/fi";

const socialLinks = [FiInstagram, FiTwitter, FiYoutube];

const Footer = () => (
    <footer className="border-t border-white/5 bg-obsidian-2">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                    <Link to="/" className="flex items-center gap-2">
                        <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
                            <rect
                                width="32"
                                height="32"
                                rx="7"
                                fill="#FF5A36"
                            />
                            <path
                                d="M8 23 L15 9 L18 9 L13 18 L20 18 L25 9 L27 9 L20 25 L15 25 L18 19 L13 19 Z"
                                fill="#0B0C0E"
                            />
                        </svg>

                        <span className="font-display text-lg font-bold text-fog">
                            KESTREL <span className="text-ember">MOTORS</span>
                        </span>
                    </Link>

                    <p className="mt-4 max-w-xs text-sm text-steel">
                        A curated inventory of performance and luxury vehicles,
                        delivered to your door.
                    </p>

                    <div className="mt-5 flex gap-3">
                        {socialLinks.map((Icon, index) => (
                            <a
                                key={index}
                                href="#"
                                aria-label="Social link"
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-steel transition hover:border-ember/50 hover:text-ember"
                            >
                                <Icon size={15} />
                            </a>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-fog">
                        Explore
                    </h4>

                    <ul className="mt-4 space-y-2.5 text-sm text-steel">
                        <li>
                            <Link to="/vehicles" className="hover:text-ember">
                                Vehicle Listing
                            </Link>
                        </li>

                        <li>
                            <Link to="/about" className="hover:text-ember">
                                About Us
                            </Link>
                        </li>

                        <li>
                            <Link to="/contact" className="hover:text-ember">
                                Contact
                            </Link>
                        </li>

                        <li>
                            <Link to="/my-orders" className="hover:text-ember">
                                My Orders
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-fog">
                        Company
                    </h4>

                    <ul className="mt-4 space-y-2.5 text-sm text-steel">
                        <li>
                            <a href="#" className="hover:text-ember">
                                Careers
                            </a>
                        </li>

                        <li>
                            <a href="#" className="hover:text-ember">
                                Press
                            </a>
                        </li>

                        <li>
                            <a href="#" className="hover:text-ember">
                                Warranty
                            </a>
                        </li>

                        <li>
                            <a href="#" className="hover:text-ember">
                                Financing
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-fog">
                        Visit
                    </h4>

                    <ul className="mt-4 space-y-2.5 text-sm text-steel">
                        <li>45 MG Road, Bengaluru, Karnataka</li>
                        <li>Mon – Sat, 9am – 7pm</li>
                        <li>hello@kestrelmotors.in</li>
                        <li>+91 98765 43210</li>
                    </ul>
                </div>
            </div>

            <div className="speed-divider my-10" />

            <div className="flex flex-col items-center justify-between gap-3 text-xs text-steel sm:flex-row">
                <p>© {new Date().getFullYear()} Kestrel Motors. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

export default Footer;