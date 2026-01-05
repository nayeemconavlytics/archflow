export default function Footer() {
  return (
    <footer className="border-t border-[color:var(--border)] py-10 mt-32">
      <div className="container-main text-sm text-[color:var(--text-muted)]">
        © {new Date().getFullYear()} ArchFlow. All rights reserved.
      </div>
    </footer>
  );
}
