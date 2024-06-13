import { useQuery } from "@tanstack/react-query";
import { fetchSessions } from "../services/quiz";
import { Chip, Typography } from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import { Link } from "react-router-dom";
import NoDataBox from "./NoData.Box";

export default function SessionList() {
  const { data } = useQuery({
    queryKey: ["Sessions"],
    queryFn: fetchSessions,
  });
  console.log(data);
  return (
    <ul
      style={{ maxHeight: "60vh", overflowY: "auto" }}
      role="list"
      className="divide-y divide-gray-100"
    >
      {data?.data?.sessions?.length ? (
        data?.data?.sessions?.map((session, i) => (
          <Link
            to={`/results/${session._id}`}
            key={session._id}
            className="flex justify-between gap-x-6 p-5 link"
          >
            <div className="flex min-w-0 gap-x-4">
              <QuizIcon />
              <div className="min-w-0 flex-auto">
                <p className="text-lg font-semibold leading-6 text-gray-900">
                  {`Session ${i + 1}`}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  <Typography> {session._id}</Typography>
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{session.role}</p>

              <p className="mt-1 text-xs leading-5 text-gray-500 flex gap-3">
                <Typography>Questions Asked</Typography>
                <Chip
                  color="primary"
                  label={session?.questionsShowed?.length}
                />
              </p>
            </div>
          </Link>
        ))
      ) : (
        <NoDataBox />
      )}
    </ul>
  );
}
