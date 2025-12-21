import { IColor } from "@/types/Color";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import useColorStore from "@/store/ColorStore";
import ColorDialog from "./ColorDialog";

interface ColorCardProps {
  color: IColor;
}

const ColorCard = ({ color }: ColorCardProps) => {
  const removeColor = useColorStore((state) => state.removeColor);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{color.label}</CardTitle>
        <CardDescription className="mt-2">
          <div className="flex gap-3">
            <div
              style={{ backgroundColor: color.hex }}
              className={`rounded-4xl w-5 h-5`}
            />
            {color.hex}
          </div>
        </CardDescription>
        <CardAction>
          <div className="flex gap-2">
            <ColorDialog type="UPDATE" color={color}>
              <Button variant={"ghost"}>
                <PencilIcon />
              </Button>
            </ColorDialog>
            <Button
              onClick={() => removeColor(color.id)}
              variant={"ghost"}
              className=" rounded-md  group"
            >
              <TrashIcon className="text-black group-hover:text-red-500" />
            </Button>
          </div>
        </CardAction>
      </CardHeader>
    </Card>
  );
};

export default ColorCard;
