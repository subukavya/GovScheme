type Props = {
  title: string;
  description: string;
};

function FeatureCard({ title, description }: Props) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default FeatureCard;