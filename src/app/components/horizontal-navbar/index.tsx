import { horizontalBottomNavigation, navigation } from "@/app/config/data";
import { CustomSmallText } from "@/app/ui-utils/text";
import { FileIcon, HomeIcon, PhoneOutgoingIcon, Video } from "lucide-react";
import Link from "next/link";

function getIcon(icon: string) {
  switch (icon) {
    case "home":
      return <HomeIcon />;
    case "FileIcon":
      return <FileIcon />;
    case "PhotosIcon":
      return <PhoneOutgoingIcon />;
    case "VideosIcon":
      return <Video />;
    default:
      return <HomeIcon className="mr-2" />;
  }
}
const HorizontalTopNavbar = () => {
  return (
    <nav className="w-[100%] flex items-center overflow-auto bg-red-500 scrollbar-hide">
      {navigation.map((item: any) =>
        item.title === "Home" ? (
          <Link
            key={item.title}
            href={item.path}
            className="py-2 px-4 text-white whitespace-nowrap"
          >
            <HomeIcon className="mr-2" />
          </Link>
        ) : (
          <Link
            key={item.title}
            href={item.path}
            className="py-2 px-4 text-white whitespace-nowrap"
          >
            {item.teluguTitle}
          </Link>
        )
      )}
    </nav>
  );
};

const HorizontalBottomNavbar = () => {
  return (
    <nav className="w-[100%] flex items-center justify-around bg-red-600">
      {horizontalBottomNavigation.map((item: any) => (
        <Link
          key={item.title}
          href={item.path}
          className="py-2 px-4 flex flex-col items-center gap-1 text-white whitespace-nowrap"
        >
          {/* {item.teluguTitle} */}
          {getIcon(item.icon)}
          <CustomSmallText>{item.title}</CustomSmallText>
        </Link>
      ))}
    </nav>
  );
};

export { HorizontalTopNavbar, HorizontalBottomNavbar };
