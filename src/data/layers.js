export const layers = [
    {
    id: 'physical',
    num: 1,
    name: 'Physical',
    color: '#ff3b5c',
    tailwindColor: 'layer-physical',
    protocols: ['Wi-Fi (802.11)', 'Ethernet Cable', 'Fiber Optic', 'USB', 'Hardware'],
    description: 'The physical transmission of raw bits over a medium. Cables, fiber, radio signals and the hardware that carries them. The foundation every other layer depends on.',
    attacks: [
      {
        id: 'rogue-device',
        name: 'Rogue Network Device',
        risk: 'high',
        description: 'A rogue switch, hub or network tap planted between the laptop and the wall jack passively copies all traffic at the wire level. The network connection works normally — passive taps are completely invisible to software and network scans, while active devices may appear in switch CAM table audits.',
        defenses: [
          'Encrypt all traffic (TLS everywhere)',
          '802.1X port authentication',
          'Physical inspection of ports and cables',
          'Secure network closets'
        ]
      },
      {
        id: 'evil-maid',
        name: 'Evil Maid Attack',
        risk: 'critical',
        description: 'An attacker with brief unsupervised physical access boots from external media, clones the drive or installs a hardware implant. Bypasses all software security controls — no credentials or exploits needed.',
        defenses: [
          'Secure Boot + TPM (Trusted Platform Module)',
          'BIOS/UEFI password',
          'Disable USB boot in BIOS',
          'Full Disk Encryption (FDE)',
          'Tamper-evident seals'
        ]
      },
      {
        id: 'hardware-keylogger',
        name: 'Hardware Keylogger',
        risk: 'high',
        description: 'An inline device between keyboard and computer silently records every keystroke — including FDE passwords and credentials. Operates below the OS, invisible to antivirus and EDR.',
        defenses: [
          'Inspect USB ports regularly',
          'USB port blockers on unused ports',
          'USB device allowlisting',
          'On-screen keyboard for sensitive input'
        ]
      },
      {
        id: 'cold-boot',
        name: 'Cold Boot Attack',
        risk: 'critical',
        description: 'Cooling RAM chips preserves encryption keys after power is cut. Attacker reboots into a USB tool to dump RAM contents before decay — extracting FDE keys without knowing the password.',
        defenses: [
          'Hibernate instead of sleep',
          'Power off fully in untrusted environments',
          'RAM encryption (Intel TME / AMD SME)',
          'TPM + PIN on resume'
        ]
      },
      {
        id: 'usb-rubber-ducky',
        name: 'USB Drop / Rubber Ducky',
        risk: 'high',
        description: 'Malicious USB devices register as HID keyboards and execute payloads at machine speed before OS security controls respond. USB Drop uses social engineering. Rubber Ducky requires direct physical access.',
        defenses: [
          'Never plug in unknown USB devices',
          'USB device allowlisting',
          'Disable AutoRun / AutoPlay',
          'Security awareness training'
        ]
      },
      {
        id: 'cable-tap',
        name: 'Cable / Jack Tampering',
        risk: 'high',
        description: 'Modified ethernet cables, wall jacks, or patch panel connections contain hidden taps that intercept all traffic silently. Copper cables can also be tapped inductively — reading the electromagnetic field from outside the cable jacket without any physical contact or signal degradation. Nothing new appears on the network — undetectable by scanning.',        defenses: [
          'Encrypt all traffic (TLS everywhere)',
          'Tamper-evident seals on jacks and cabinets',
          'Regular physical inspection',
          'Prefer fiber optic over copper'
        ]
      },
    ],
    defenses: [
      'Full Disk Encryption (FDE)',
      'Secure Boot + TPM (Trusted Platform Module)',
      'BIOS/UEFI password',
      '802.1X port authentication',
      'Physical access controls',
      'Security awareness training'
    ]
  },
  {
    id: 'datalink',
    num: 2,
    name: 'Data Link',
    color: '#ff7b2f',
    tailwindColor: 'layer-datalink',
    protocols: ['Ethernet', 'MAC', 'ARP', 'VLAN', 'STP', '802.1X'],
    description: 'Node-to-node data transfer on the same network segment. Handles MAC addressing, frame delivery and local network topology. Attacks here operate below IP - invisible to traditional firewalls. Attacker must be on the same segment. ',
    attacks: [
      {
        id: 'arp-spoofing',
        name: 'ARP Spoofing / Poisoning',
        risk: 'critical',
        description: 'ARP has no authentication — any device can broadcast fake ARP replies claiming any IP belongs to any MAC. Attacker poisons ARP caches to associate their MAC with a legitimate IP address — typically the default gateway, silently intercepting all traffic.',
        defenses: [
          'Dynamic ARP Inspection (DAI)',
          'DHCP Snooping (required for DAI)',
          'Static ARP entries for critical hosts',
          'Encrypt all traffic (TLS everywhere)'
        ]
      },
      {
        id: 'mac-flooding',
        name: 'MAC Flooding',
        risk: 'high',
        description: 'Switch CAM tables have a fixed memory size. Flooding the switch with frames using random fake MAC addresses fills the table completely. Switch enters fail-open mode — broadcasting all frames to every port like a hub, exposing all traffic to the attacker.',
        defenses: [
          'Port security — limit MACs per port',
          '802.1X authentication on all ports',
          'VLAN segmentation — limits blast radius',
          'Network monitoring — alert on abnormal frame rates'
        ]
      },
      {
        id: 'vlan-hopping',
        name: 'VLAN Hopping',
        risk: 'high',
        description: 'Switch Spoofing (exploits auto-negotiating trunk ports (DTP) by acting as a trunk port) or Double Tagging (nesting 802.1Q tags) to send frames into VLANs the attacker has no access to. Breaks network segmentation.',
        defenses: [
          'Disable DTP on all access ports',
          'Change native VLAN to unused VLAN ID',
          'Firewall between VLANs',
          'Explicitly tag all native VLAN traffic'
        ]
      },
      {
        id: 'stp-attack',
        name: 'STP Root Bridge Attack',
        risk: 'high',
        description: 'STP elects a Root Bridge using unauthenticated BPDU frames — the switch with the lowest priority wins. Attacker sends BPDUs with priority 0, forces STP reconvergence and become the Spanning Tree Root Bridge. All switching  traffic now routes through the attacker.',
        defenses: [
          'BPDU Guard — disables port on any BPDU received',
          'Root Guard — prevents port from becoming Root Bridge',
          'Enable Portfast on access ports',
          'Monitor for unexpected STP topology changes'
        ]
      },
      {
        id: 'rogue-dhcp',
        name: 'Rogue DHCP Server',
        risk: 'critical',
        description: 'A malicious DHCP server that responds faster than the legitimate one, assigning a rogue default gateway and DNS server to new clients — instant silent MitM from the moment the laptop requests an IP.',
        defenses: [
          'DHCP Snooping with trusted/untrusted ports',
          '802.1X — only authenticated devices can connect',
          'Static IP on critical devices',
          'Monitor for multiple DHCP servers on segment'
        ]
      },
      {
        id: '8021x-bypass',
        name: '802.1X Authentication Bypass',
        risk: 'medium',
        description: 'If port-based Network Access Control is misconfigured, attackers can bypass 802.1X using identity spoofing (cloning an approved device MAC to pass MAB authentication), a hub between the authenticator and supplicant, or exploiting RADIUS misconfigurations in the authentication server.',
        defenses: [
          'Certificate-based EAP-TLS — no MAB fallback',
          'Port security — maximum 1 MAC per port',
          '802.1X re-authentication periodically',
          'Keep RADIUS server patched and audited'
        ]
      },
    ],
    defenses: [
      'Dynamic ARP Inspection (DAI)',
      'DHCP Snooping',
      '802.1X port authentication',
      'Port security (MAC limiting)',
      'BPDU Guard + Root Guard',
      'Disable DTP on access ports'
    ]
  },
  {
    id: 'network',
    num: 3,
    name: 'Network',
    color: '#ffcc00',
    tailwindColor: 'layer-network',
    protocols: ['IP', 'ICMP', 'BGP', 'OSPF', 'RIP', 'IPSec'],
    description: 'Logical addressing and packet routing across networks. Determines how data travels from source to destination across multiple hops. Attacks here can redirect, intercept, or disrupt traffic at local or internet scale.',
    attacks: [
      {
        id: 'ip-spoofing',
        name: 'IP Spoofing',
        risk: 'high',
                description: 'IP has no mechanism to verify source addresses. Attacker crafts packets with a forged source IP to impersonate another host, bypass IP-based access controls, or use amplification services to flood a victim with traffic they never requested.',
        defenses: [
          'Ingress filtering (BCP38) at ISP level',
          'Egress filtering — block spoofed packets leaving your network',
          'Replace IP-based access controls with proper authentication',
          'Rate limit UDP services vulnerable to amplification (DNS, NTP)'
        ]
      },
      {
        id: 'bgp-hijacking',
        name: 'BGP Hijacking',
        risk: 'critical',
        description: 'BGP has no authentication — any Autonomous System (AS) can announce any IP prefix. Attacker announces a more specific prefix than the legitimate owner, causing global routing tables to redirect traffic through attacker-controlled infrastructure. Can intercept or blackhole traffic at internet scale.',
        defenses: [
          'RPKI — cryptographically sign and validate route announcements',
          'BGP route monitoring — detect unexpected prefix announcements',
          'Peer prefix filtering — only accept expected routes from neighbours',
          'MANRS compliance'
        ]
      },
      {
        id: 'icmp-attacks',
        name: 'ICMP Attacks (Smurf, Ping of Death)',
        risk: 'high',
        description: 'Smurf attack sends spoofed ICMP Echo Requests to broadcast addresses — every device on the network replies to the victim, amplifying traffic. Ping of Death sends oversized fragmented ICMP packets that crash vulnerable systems during reassembly.',
        defenses: [
          'Block directed broadcasts at routers (defeats Smurf)',
          'Rate limit inbound ICMP traffic',
          'Block oversized ICMP packets at firewall',
          'Keep OS patched — Ping of Death variants still emerge'
        ]
      },
      {
        id: 'route-injection',
        name: 'OSPF / RIP Route Injection',
        risk: 'high',
        description: 'Interior routing protocols (OSPF, RIP) accept updates with no authentication by default. Attacker injects false route announcements to redirect internal traffic through attacker-controlled paths, blackhole services, or map internal network topology passively.',
        defenses: [
          'OSPF MD5/SHA authentication',
          'Never use RIP v1 — use RIP v2 with authentication',
          'Route filtering — only accept expected routes from known neighbours',
          'Monitor for unexpected routing table changes'
        ]
      },
      {
        id: 'fragmentation',
        name: 'IP Fragmentation Attacks',
        risk: 'medium',
        description: 'Teardrop sends overlapping fragments that crash vulnerable systems during reassembly. Fragmentation evasion splits malicious payloads across fragments so no single fragment triggers IDS signatures — the complete payload only appears after reassembly at the destination.',
        defenses: [
          'Stateful fragment reassembly at firewall before inspection',
          'Drop overlapping fragments at network perimeter',
          'Keep OS patched',
          'Minimum fragment size enforcement'
        ]
      },
      {
        id: 'ttl-manipulation',
        name: 'TTL Manipulation',
        risk: 'medium',
        description: 'Systematic TTL probing maps internal network topology and router positions. Different default TTL values per OS (Linux=64, Windows=128) enable passive OS fingerprinting. Crafted TTL values exploit differences between what an IDS sees and what the destination receives — evading detection.',
        defenses: [
          'Randomise TTL values on outbound packets',
          'Block outbound ICMP Time Exceeded at perimeter — hides internal topology',
          'Stateful IDS with full session tracking',
          'Monitor for systematic TTL probing patterns'
        ]
      },
    ],
    defenses: [
      'Ingress / Egress filtering (BCP38)',
      'RPKI for BGP route validation',
      'OSPF / RIP authentication',
      'IPSec — encrypt and authenticate IP traffic',
      'Stateful firewall and IDS',
      'Network traffic monitoring'
    ]
  },
  {
    id: 'transport',
    num: 4,
    name: 'Transport',
    color: '#39e87a',
    tailwindColor: 'layer-transport',
    protocols: ['TCP', 'UDP', 'QUIC', 'SCTP'],
    description: 'End-to-end communication between applications on different hosts. Manages connections, ports, reliability, and flow control. Primary layer for reconnaissance and denial of service.',
    attacks: [
      {
        id: 'port-scanning',
        name: 'Port Scanning',
        risk: 'medium',
        description: 'The moment a machine joins a network, automated scanners probe TCP/UDP ports to enumerate open services and identify attack vectors. Nmap SYN scans may be undetectable without dedicated monitoring.',
        defenses: [
          'Firewall — close all not required ports',
          'Port knocking — ports invisible until correct sequence received',
          'IDS/IPS — detect and alert on systematic scanning patterns',
          'Minimise attack surface — run only necessary services'
        ]
      },
      {
        id: 'syn-flood',
        name: 'SYN Flood (DoS)',
        risk: 'high',
        description: 'Sending a massive volume of TCP SYN packets without completing the three-way handshake. The target allocates state for each half-open connection until its connection table is exhausted and legitimate connections are refused.',
        defenses: [
          'SYN Cookies',
          'Rate limiting SYN packets per source IP',
          'Firewall SYN flood protection',
          'Anycast diffusion for large-scale attacks'
        ]
      },
      {
        id: 'tcp-hijacking',
        name: 'TCP Session Hijacking',
        risk: 'high',
        description: 'Predicting or sniffing TCP sequence numbers to inject malicious packets into an established connection mid-stream, without needing to complete the original handshake.',
        defenses: [
          'TLS — injected data fails HMAC verification',
          'Encrypted Protocols only (SSH, HTTPS, etc.)',
          'ARP Spoofing prevention (DAI) — removes MitM',
          'Randomised TCP sequence numbers'
        ]
      },
      {
        id: 'udp-flood',
        name: 'UDP Flood / Amplification',
        risk: 'high',
        description: 'Flooding random UDP ports to consume bandwidth and processing, or abusing UDP-based services (DNS, NTP, memcached) as amplifiers — sending small spoofed requests that trigger large responses toward the victim.',
        defenses: [
          'BCP38 / uRPF — block spoofed IPs at network edge',
          'Rate limit UDP responses on amplifiable services',
          'Disable open DNS resolvers',
          'Commercial DDoS scrubbing (Cloudflare, Akamai)'
        ]
      },
      {
        id: 'connection-exhaustion',
        name: 'Connection State Exhaustion',
        risk: 'high',
        description: 'Flooding a target with half-open, slow, or malformed connections (Slowloris, RUDY) to consume all available connection slots without generating enough traffic to trigger volumetric DDoS defenses.',
        defenses: [
          'Reverse Proxy (Nginx, Cloudflare) — only forwards complete requests',
          'Aggressive connection timeout tuning',
          'Limit simultaneous connections per source IP',
          'Load balancing across multiple servers'
        ]
      },
      {
        id: 'tcp-rst-injection',
        name: 'TCP Reset (RST) Injection',
        risk: 'medium',
        description: 'TCP accepts RST packets based on source IP and sequence number alone — no cryptographic verification. Attacker spoofs a RST packet with the correct sequence number, causing both endpoints to immediately terminate the connection. Used by China\'s Great Firewall.',
        defenses: [
          'TLS — RST are authenticated in QUIC and TLS 1.3',
          'IDS — monitor for abnormal RST patterns',
          'ARP Spoofing prevention (DAI) — removes MitM',
          'Encrypted tunnels (VPN)'
        ]
      },
    ],
    defenses: [
      'SYN Cookies',
      'Stateful firewall — close unused ports',
      'TLS on all TCP sessions',
      'Rate limiting per source IP',
      'IDS / IPS monitoring',
      'Reverse proxy for web services'
    ]
  },
  {
    id: 'session',
    num: 5,
    name: 'Session',
    color: '#00c4ff',
    tailwindColor: 'layer-session',
    protocols: ['Cookies', 'Tokens', 'SMB', 'RPC', 'NetBIOS'],
    description: 'Establishes, manages, and terminates communication sessions between applications. Handles authentication state and dialog control. Target for session theft and credential relay attacks.',
    attacks: [
        {
        id: 'session-hijacking',
        name: 'Session Hijacking',
        risk: 'critical',
        description: 'Session tokens are transmitted with every request after login — stealing one grants full account access without credentials. Tokens are captured via MitM interception, XSS injection, session fixation, or physical browser access. Server cannot distinguish the legitimate user from the token thief.',
        defenses: [
          'HTTPS everywhere — no tokens transmitted in plaintext',
          'HttpOnly + Secure + SameSite cookie flags',
          'Short session token expiry with re-authentication',
          'Regenerate session ID after login — prevents fixation'
        ]
      },
      {
        id: 'session-replay',
        name: 'Session Replay Attack',
        risk: 'high',
        description: 'Capturing valid authentication credentials or session tokens in transit and retransmitting them to gain unauthorized access — bypassing the need to crack or know the original password. Long-lived tokens (API keys, JWTs without expiry) are particularly vulnerable.',
        defenses: [
          'Short token expiry — minimise replay window',
          'Nonces — unique single-use values',
          'HTTPS',
          'Cryptographic token binding to TLS session'
        ]
      },
      {
        id: 'pass-the-hash',
        name: 'SMB Relay / Pass-the-Hash',
        risk: 'critical',
        description: 'Windows SMB authentication uses NTLM hashes. An attacker intercepts and relays these hashes to authenticate to other systems without ever cracking them. Particularly effective at boot when domain authentication occurs.',
        defenses: [
          'SMB Signing',
          'Least privilege',
          'Disable NTLM — enforce Kerberos authentication',
          'Disable LLMNR and NBT-NS — removes name poisoning vector',
        ]
      },
      {
        id: 'rpc-exploitation',
        name: 'RPC Exploitation',
        risk: 'critical',
        description: 'Remote Procedure Call vulnerabilities allow unauthenticated code execution through exposed RPC interfaces. The MS03-026 vulnerability exploited by the Blaster worm is a historical example.',
        defenses: [
          'Keep Windows fully patched',
          'Network segmentation',
          'Firewall port 135 and dynamic RPC ports from untrusted networks',
          'Disable unnecessary RPC services'
        ]
      },
      {
        id: 'null-session',
        name: 'Null Session Attack',
        risk: 'medium',
        description: 'Connecting anonymously to Windows IPC$ share with no credentials to enumerate users, password policies, shares, and domain information — useful reconnaissance before a targeted attack.',
        defenses: [
          'Set RestrictAnonymous = 2 in registry',
          'Firewall SMB ports (445, 139) from untrusted networks',
          'Patch and replace legacy Windows systems',
          'Network segmentation — isolate legacy systems',
        ]
      },
    ],
        defenses: [
      'SMB Signing (mandatory)',
      'Disable NTLM — enforce Kerberos',
      'Disable LLMNR and NBT-NS',
      'HTTPS with secure cookie flags',
      'Short session token expiry',
      'Firewall RPC and SMB ports',
    ]
  },
  {
    id: 'presentation',
    num: 6,
    name: 'Presentation',
    color: '#7b6aff',
    tailwindColor: 'layer-presentation',
    protocols: ['SSL/TLS', 'JSON', 'ASCII', 'MIME', 'JPEG', 'Gzip'],
    description: 'Data translation, encryption, and formatting between application and network. Handles encoding, compression, cryptographic negotiation, certificate trust, format parsing, and object deserialization.',
    attacks: [
      {
        id: 'tls-downgrade',
        name: 'TLS Downgrade (POODLE, BEAST, FREAK)',
        risk: 'critical',
        description: 'Forcing negotiation of a weaker cipher suite or older protocol version (SSLv3, TLS 1.0) by interfering with the handshake. Once downgraded, the attacker can decrypt the traffic.',
        defenses: [
          'Support TLS 1.2 and 1.3 only ',
          'Implement TLS_FALLBACK_SCSV',
          'Disable export-grade cipher suites',
          'HSTS — prevents protocol downgrade at HTTP level',
        ]
      },
      {
        id: 'ssl-stripping',
        name: 'SSL Stripping',
        risk: 'critical',
        description: 'A MitM technique that intercepts HTTPS redirect responses and serves plain HTTP to the client instead, silently removing all encryption. Highly effective on the initial connection before HSTS is established.',
        defenses: [
          'HSTS — browser connects directly via HTTPS',
          'HSTS Preloading — HTTPS enforced even on first visit',
          'Secure cookie flag — never transmitted over HTTP',
          'CSP upgrade-insecure-requests header',
        ]
      },
      {
        id: 'cert-spoofing',
        name: 'Certificate Spoofing / Forgery',
        risk: 'critical',
        description: 'Presenting a fraudulent TLS certificate to the client. If certificate chain validation is improper, the client trusts the attacker\'s cert and establishes an encrypted session — with the attacker.',
        defenses: [
          'Certificate Transparency (CT)',
          'CAA DNS records — which CAs may issue for your domain',
          'OCSP Stapling — efficient revocation checking',
          'Certificate pinning for high-value applications',
        ]
      },
      {
        id: 'format-exploits',
        name: 'Malformed Format Exploits',
        risk: 'high',
        description: 'File format parsers (PDF, JPEG, PNG, etc.) contain memory management code written in C/C++. Crafted files may trigger buffer overflows, integer overflows, or use-after-free vulnerabilities in parsing code. Just opening or rendering a malicious file achieves arbitrary code execution.',
        defenses: [
          'Keep all software patched',
          'Open untrusted files in sandboxed environments',
          'Disable unnecessary features (macros, JS in PDFs)',
          'EDR / antivirus — detects malicious file patterns',
        ]
      },
      {
        id: 'weak-ciphers',
        name: 'Weak Cipher Negotiation',
        risk: 'high',
        description: 'Servers or clients configured to accept NULL ciphers, export-grade cryptography (EXPORT), RC4, or DES — all trivially breakable with modern hardware or known attacks.',
        defenses: [
          'Disable all weak cipher suites — RC4, NULL, DES, 3DES, export-grade',
          'Prefer AEAD cipher suites',
          'Minimum 2048-bit DH parameters — prefer ECDHE',
          'Regular TLS audits with SSL Labs or testssl.sh',
        ]
      },
      {
        id: 'insecure-deserialization',
        name: 'Insecure Deserialization',
        risk: 'critical',
        description: 'Many deserialization implementations execute code while reconstructing objects from byte streams. Attacker sends a crafted serialized object that abuses existing classes on the server to achieve arbitrary code execution. No code upload needed.',
        defenses: [
          'Never deserialize untrusted data — primary defense',
          'JSON with schema validation over binary serialization',
          'Implement deserialization allowlists',
          'Keep frameworks patched',
        ]
      },
    ],
    defenses: [
      'TLS 1.3 only (disable 1.0, 1.1, SSLv3)',
      'HSTS with preloading',
      'Certificate Transparency monitoring',
      'Strong AEAD cipher suites only',
      'CAA DNS records',
      'Regular TLS configuration audits'
    ]
  },
  {
    id: 'application',
    num: 7,
    name: 'Application',
    color: '#e040fb',
    tailwindColor: 'layer-application',
    protocols: ['HTTPS', 'DNS', 'SSH', 'FTP', 'SMTP', 'IMAP', 'REST', 'LDAP'],
    description: 'The interface between the network and end-user software. The highest-level layer and the largest attack surface — every web app, email client, and network service operates here. Every feature is a potential vulnerability.',
    attacks: [
      {
        id: 'phishing',
        name: 'Phishing / Spear Phishing',
        risk: 'critical',
        description: 'Impersonates trusted entities via email, SMS, or voice to steal credentials or deliver malware. Spear phishing uses personal research for high conversion rates. AiTM (Adversary-in-the-Middle) phishing proxies real sites in real time — capturing session tokens and bypassing MFA. Main initial access vector in most major breaches.',
        defenses: [
          'AiTM MFA (FIDO2/WebAuthn) - YubiKeys',
          'Anti-phishing email filters (DMARC, SPF, DKIM)',
          'Security awareness training',
          'DNS filtering — block known phishing domains'
        ]
      },
      {
        id: 'drive-by',
        name: 'Drive-by Download / Malware Delivery',
        risk: 'critical',
        description: 'Visiting a compromised or attacker-controlled page triggers silent browser exploits or downloads. Executes entirely within the application context — no user interaction required beyond visiting the URL.',
        defenses: [
          'Keep browser and plugins fully patched',
          'Ad blockers — block malvertising delivery',
          'Browser isolation (RBI) — render pages remotely',
          'Disable unnecessary browser plugins'
        ]
      },
      {
        id: 'dns-poisoning',
        name: 'DNS Poisoning / Hijacking',
        risk: 'critical',
        description: 'DNS cache poisoning injects false records into resolvers — redirecting users silently. Rogue DNS servers (via DHCP or malware) control all name resolution. Registrar-level hijacking changes authoritative nameservers globally. All connections start with DNS — control it and you control where everything goes.',
        defenses: [
          'DNSSEC — cryptographically sign and validate DNS records',
          'DNS over HTTPS (DoH) / DNS over TLS (DoT)',
          'Registrar account MFA + Registry Lock',
          'Monitor DNS records for unexpected changes'
        ]
      },
      {
        id: 'sqli-xss',
        name: 'Injection Attacks (SQLi, XSS, CSRF)',
        risk: 'critical',
        description: 'SQL Injection targets server-side database queries. XSS injects malicious scripts into pages viewed by other users. CSRF tricks authenticated users into making unintended requests. All exploit insufficient input validation.',
        defenses: [
          'Parameterised queries / prepared statements (SQLi)',
          'Output encoding + Content Security Policy (XSS)',
          'CSRF tokens + SameSite cookie attribute',
          'Input validation and allowlisting across all inputs'
        ]
      },
      {
        id: 'credential-stuffing',
        name: 'Credential Stuffing / Brute Force',
        risk: 'high',
        description: 'Automated login attempts using leaked credential databases (stuffing) or exhaustive password guessing (brute force) against authentication endpoints. Highly effective due to widespread password reuse.',
        defenses: [
          'MFA — credentials alone are insufficient',
          'Phishing-resistant MFA (FIDO2) — defeats MFA fatigue',
          'Breach monitoring (Have I Been Pwned API)',
          'Rate limiting and CAPTCHA on authentication endpoints'
        ]
      },
      {
        id: 'supply-chain',
        name: 'Supply Chain / Update Hijacking',
        risk: 'critical',
        description: 'Compromises trusted vendors, build pipelines, or open source packages upstream — victims pull the malicious payload themselves through normal update mechanisms.',
        defenses: [
          'Software Composition Analysis (SCA) — audit all dependencies (Snyk, Dependabot)',
          'Pin dependency versions — prevent unexpected updates',
          'Verify package signatures and checksums',
          'Monitor build pipeline integrity'
        ]
      },
      {
        id: 'api-abuse',
        name: 'API Abuse / Zero-Day Exploitation',
        risk: 'critical',
        description: 'Exploiting undocumented, unauthenticated, or vulnerable API endpoints. BOLA (Broken Object Level Authorisation) exposes entire databases by iterating object IDs — authenticated but unauthorised access. Zero-days exploit unknown vulnerabilities before patches exist.',
        defenses: [
          'Authorisation checks on every API endpoint',
          'API rate limiting and anomaly detection',
          'Virtual patching via WAF for zero-day mitigation',
          'Threat intelligence — monitor for zero-day disclosures',
        ]
      },
    ],
    defenses: [
      'Phishing-resistant MFA (FIDO2/WebAuthn)',
      'DMARC, SPF, DKIM email authentication',
      'WAF — web application firewall',
      'DNSSEC + DNS over HTTPS',
      'Parameterised queries + output encoding',
      'Software Composition Analysis (SCA)',
    ]
  }
]