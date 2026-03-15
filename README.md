# OSI Attack Map

> Interactive reference map of cyberattacks and defenses across all 7 layers of the OSI model.

Live at: **[jfgmesquita.github.io/osi-attack-map](https://jfgmesquita.github.io/osi-attack-map)**

---

## About

The OSI Attack Map is an open source security reference tool designed for cybersecurity students, practitioners, and anyone preparing for security interviews or certifications.

Each OSI layer is mapped to its real-world attack vectors — with descriptions, risk levels, per-attack mitigations, and layer-wide defenses.

**Risk Level** reflects both exploitability and potential impact combined — not damage alone.

---

## Features

- All 7 OSI layers — 42 documented attack vectors
- Per-attack mitigation lists — toggle to show/hide
- Layer-wide defense summaries
- Risk level indicators — exploitability + impact combined
- Fully responsive — works on desktop and mobile
- No backend, no tracking, no ads

---

## Security

This project takes security seriously from the ground up:

- Strict Content Security Policy (CSP) via meta tags
- HTTPS enforced — GitHub Pages + HSTS
- Zero backend, zero database — no server-side attack surface
- `npm audit` runs automatically in CI — build fails on moderate+ vulnerabilities
- Dependabot enabled — automated dependency vulnerability alerts
- Branch protection on `main` — all changes via pull request
- Secret scanning enabled — alerts on accidental credential commits

---

## Development

```bash
# Clone the repository
git clone https://github.com/jfgmesquita/osi-attack-map.git
cd osi-attack-map

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run security audit
npm run audit-deps
```

---

## Contributing

Contributions are welcome — especially:

- Accuracy corrections to attack descriptions
- Missing attacks or defenses
- Real-world examples and CVE references
- Translations

Please open an issue before submitting a pull request for significant changes.

---

## License

MIT — see [LICENSE](LICENSE) for details.

---