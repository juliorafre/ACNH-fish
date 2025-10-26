interface BlockProps {
  children: React.ReactNode;
  background?: boolean;
}

function Block({ children, background = true }: BlockProps) {
  return (
    <div className={`px-5 py-3 mb-5 ${background ? 'bg-white shadow-fishHeader rounded-lg' : ''}`}>
      {children}
    </div>
  )
}

export default Block
