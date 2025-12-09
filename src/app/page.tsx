import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="flex mt-4 flex-col gap-4 h-full ">
      <div className="w-full flex justify-end gap-10 mr-12">
        <Input placeholder="Search" className="max-w-150" />
        <Button className="bg-blue-400">Add Task</Button>
      </div>
      <div className=" h-full mb-4 py-8 flex gap-8 justify-between">
        <div className="w-100 bg-gray-400 h-full"></div>
        <div className="w-100 bg-gray-400 h-full"></div>
        <div className="w-100 bg-gray-400 h-full"></div>
      </div>
    </div>
  );
}
