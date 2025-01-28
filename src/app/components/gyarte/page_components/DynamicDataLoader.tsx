import { Thesis } from "@/app/lib/DbTypes";
import ES1 from "./ES1";
import ES2 from "./ES2";
import SU1 from "./SU1"
import SY1 from "./SY1"

interface DynamicDataLoaderProps {
  studentData: Thesis;
}

export default function DynamicDataLoader({studentData}: DynamicDataLoaderProps) {
  return (
    <div>
      {(() => {
        switch (studentData.component_id) {
          case "ES1":
            return (
              <ES1 data={studentData}/>
            );

          case "ES2":

            return (
              <section>
                <ES2 data={studentData}/>
              </section>
            );
          
          case "SY0":
            return (
              <SY1 websiteLink={studentData.component_data.href} />
            );

          case "SU0":
            return (
              <SU1 videoPath={`/${studentData.component_data.video_ref}`}/>
            );

          default:
            return null;
        }
      })()}
    </div>
  )
}