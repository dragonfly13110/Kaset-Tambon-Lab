import React from 'react';
import { motion } from 'framer-motion';
import Container from './ui/Container';
import { Facebook, Mail, GitHub } from './Icons';

const footerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const socialLinks = [
  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
  { icon: Mail, label: 'Email', href: 'mailto:contact@example.com' },
  { icon: GitHub, label: 'GitHub', href: 'https://github.com' },
];

const Footer: React.FC = () => {
  return (
    <motion.footer
      className="relative border-t border-surface-200 bg-gradient-to-b from-white/80 to-surface-50/90 backdrop-blur-sm py-12 text-slate-500 font-sans overflow-hidden"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {/* Decorative Wave Top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-agri-400/30 to-transparent" />

      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-br from-agri-200/20 to-tech-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-10 -left-10 w-48 h-48 bg-gradient-to-br from-tech-200/20 to-purple-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col items-center gap-8">
          {/* Logo & Brand */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold font-display text-gradient-premium mb-2">
              Kaset Tambon Lab
            </h3>
            <p className="text-sm text-slate-400">
              แพลตฟอร์มนวัตกรรมเกษตรอัจฉริยะ
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative p-3 rounded-full bg-white/80 text-slate-500 hover:text-agri-600 shadow-sm hover:shadow-lg transition-all duration-300 group border border-surface-200/50"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                aria-label={social.label}
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-agri-400/20 to-tech-400/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300" />
                <social.icon className="h-5 w-5 relative z-10" />
              </motion.a>
            ))}
          </motion.div>

          {/* Divider */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-agri-400/30 to-transparent" />

          {/* Copyright */}
          <motion.div
            className="flex flex-col items-center justify-center gap-2 text-center text-xs md:flex-row md:justify-between"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <p className="flex items-center gap-1">
              © {new Date().getFullYear()}
              <span className="text-gradient-agri font-medium">Kaset Tambon Lab</span>
              • กรมส่งเสริมการเกษตร
            </p>
            <p className="text-slate-400 flex items-center gap-1">
              <span>✨</span>
              ออกแบบเพื่อเกษตรอัจฉริยะ
              <span>🌾</span>
            </p>
          </motion.div>
        </div>
      </Container>
    </motion.footer>
  );
};

export default Footer;