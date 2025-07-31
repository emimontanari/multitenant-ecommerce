import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <div className="p-10">
      <div className="flex flex-col gap-y-4">
        <div>
          <Button variant={"elevated"}>Click me!</Button>
        </div>

        <div>
          <Input placeholder="Input" />
        </div>
        <div>
          <Progress value={50} />
        </div>
        <div>
          <Textarea placeholder="Text area" />
        </div>
      </div>
    </div>
  );
}
