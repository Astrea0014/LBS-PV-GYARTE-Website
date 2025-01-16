interface VideoProps {
  videoRef?: string; 
}


export function Video({videoRef}: VideoProps) {

  return (
    <div className="w-full">
      {videoRef ? (
        <video className="aspect-video" controls preload="true">
          <source src={videoRef} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <h1>Video inte tillgänglig</h1>
      )}
    </div>
  );
}