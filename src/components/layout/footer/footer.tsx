export const Footer = () => {
  return (
    <footer
      id="__APP_FOOTER"
      className="relative container border-stroke-soft px-4 pt-8 pb-24 sm:px-6 sm:pt-10 md:border-x"
    >
      <p className="text-center font-mono text-label text-foreground-soft uppercase">
        meluiz @ {new Date().getFullYear()}
      </p>
    </footer>
  );
};
