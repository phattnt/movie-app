import Movie from "./components/Movie";

const Page = async () => {
  const res = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=a210960a51789a1b25ddea27ad15d692&page=1');
  const initialData = await res.json();
  return (
    <div className="flex justify-center items-center flex-col mt-2">
      <Movie initialData={initialData}/>
    </div>
  )
}

export default Page;