interface ErrorDisplayProps {
  message: null |string;
}

export default function ErrorDisplay({ message }: ErrorDisplayProps) {
  if (!message) return null;

  return (
    <div className="  text-red-700 rounded mb-2 text-sm">
      {message}
    </div>
  );
}
