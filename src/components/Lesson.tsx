import { CheckCircle, LockKey } from "phosphor-react";
import { isPast, format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Link, useParams } from "react-router-dom";
import classnames from "classnames";
interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: "live" | "class";
}
export const Lesson = (props: LessonProps) => {
  const { slug } = useParams<{ slug: string }>();
  const isLesonAvailable = isPast(props.availableAt);
  const availableAtDateFormat = format(
    props.availableAt,
    "EEEE' • 'd ' de ' MMMM ' • ' k'h'mm ",
    {
      locale: ptBR,
    }
  );
  const isActiveLeson = slug === props.slug;

  return (
    <Link to={`/event/lesson/${props.slug}`} className={classnames("group",{
      'pointer-events-none':!isLesonAvailable,
      'pointer-events-auto':isLesonAvailable,
     
    })}>
      <span className="text-gray-300">{availableAtDateFormat}</span>
      <div
        className={classnames(
          `rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500`,
          {
            "bg-green-500": isActiveLeson,
           
          }
        )}
      >
        <header className="flex items-center justify-between">
          {isLesonAvailable ? (
            <span className={classnames("text-sm text-blue-500 font-medium flex items-center gap-2",{
              'text-white':isActiveLeson,
              'text-blue-500':!isActiveLeson
            })}>
              <CheckCircle size={20} />
              Conteúdo Liberado
            </span>
          ) : (
            <span  className={classnames("text-sm text-orange-500 font-medium flex items-center gap-2 disabled:opacity-75",{
            
            })}>
              <LockKey size={20} />
              Em breve
            </span>
          )}
          <span className={classnames("rounded px-2 py-[0.125rem] text-white font-bold border border-green-300",{
            'border-white':isActiveLeson,
            'border-green-300':!isActiveLeson,
          })}>
            {props.type == "live" ? "AO VIVO" : "AULA PRATICA"}
          </span>
        </header>

        <strong
          className={classnames("block  mt-5", {
            "text-white": isActiveLeson,
            "text-gray-200": !isActiveLeson,
          })}
        >
          {props.title}
        </strong>
      </div>
    </Link>
  );
};
