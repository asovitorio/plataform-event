import { DefaultUi, Player, Youtube } from "@vime/react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  CaretRight,
  DiscordLogo,
  FileArrowDown,
  Image,
  Lightning,
} from "phosphor-react";
import "@vime/core/themes/default.css";
import { useGetLessonBySlugQuery } from "../graphql/generated-types";

interface VideoProps {
  lessonSlug: string;
}

export const Video = (props: VideoProps) => {
  let { data } = useGetLessonBySlugQuery({
    variables: {
      slug: props.lessonSlug,
    },
  });

  if (!data || !data?.lesson) {
    return <div className="flex-1">carregando...</div>;
  }

  return (
    <div className="flex-1">
      <div className="bg-black">
        <div className="h-full max-full-[1100px] max-h-[60vh] aspect-video m-auto ">
          <Player>
            <Youtube videoId={String(data?.lesson.videoId)} />
            <DefaultUi />
          </Player>
        </div>
      </div>
      <div className="p-8 max-w-[1100px] mx-auto">
        <div className="flex items-start gap-16">
          <div className="flex-1 ">
            <h1 className="text-2xl font-bold">{data?.lesson.title}</h1>
            <p className="mt-4 text-gray-200 leading-relaxed text-justify">
              {data?.lesson.description || <Skeleton count={5} />}
            </p>
            {data.lesson.teacher && (
              <div className="flex items-center gap-4 mt-6 ">
                <img
                  src={data?.lesson.teacher.avatarURL}
                  alt=""
                  className="h-16 w-16 rounded-full border-2 border-blue-500"
                />
                <div className="leading-relaxed">
                  <strong className="font-bold text-2xl block">
                    {data?.lesson.teacher.name}
                  </strong>
                  <span className="text-gray-200 text-sm block">
                    {data?.lesson.teacher.bio}
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <a
              href="#"
              className="p-4 text-sm bg-green-500 flex justify-center items-center rounded font-bold uppercase gap-2 hover
            hover:bg-green-700 transition-colors "
            >
              <DiscordLogo size={24} />
              Cominidade do Discord
            </a>
            <a
              href="#"
              className="p-4 text-sm border border-blue-500 flex justify-center items-center rounded font-bold uppercase gap-2  hover:bg-blue-500 hover:text-gray-500 transition-colors "
            >
              <Lightning size={24} />
              Cominidade do Discord
            </a>
          </div>
        </div>
        <div className="gap-8 mt-20 grid grid-cols-2">
          <a
            href="#"
            className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600"
          >
            <div className="bg-green-700 h-full p-6 flex items-center">
              <FileArrowDown size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Material Complementar</strong>
              <p className="text-sm text-grey-200 mt-2">
                Acesse o Material complentar para acelerar o seu desenvovimento
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={24} />
            </div>
          </a>
          <a
            href="#"
            className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600"
          >
            <div className="bg-green-700 h-full p-6 flex items-center">
              <Image size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Wallpapers Exclusivos</strong>
              <p className="text-sm text-grey-200 mt-2">
                Acesse o Wallpapers Exclusivos para garantir ao seu descktop
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={24} />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};
