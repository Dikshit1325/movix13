import { Link } from "react-router-dom";
import { Film, Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react";

const quickLinks = [
  { to: "/movies", label: "Movies" },
  { to: "/my-bookings", label: "My Bookings" },
  { to: "/movies", label: "Coming Soon" },
  { to: "/movies", label: "Trending Now" },
];

const supportLinks = [
  { label: "FAQ" },
  { label: "Terms of Service" },
  { label: "Privacy Policy" },
  { label: "Contact Us" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/60 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <Film className="h-7 w-7 text-primary transition-transform duration-300 group-hover:rotate-12" />
              <span className="font-display text-2xl tracking-wider text-foreground">
                MOV<span className="text-primary">IX</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Movix makes booking movie tickets fast and easy. Discover the latest movies and reserve your seats in just a few clicks.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: Facebook, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Youtube, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display text-lg tracking-wide text-foreground">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-display text-lg tracking-wide text-foreground">Support</h4>
            <ul className="space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer">
                    {link.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display text-lg tracking-wide text-foreground">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span>Chitkara University, Rajpura, Punjab, India</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span>+91 76960 32905</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span>support@movix.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Movix. All rights reserved.</span>
          <span>Made with ❤️ for movie lovers</span>
        </div>
      </div>
    </footer>
  );
}
