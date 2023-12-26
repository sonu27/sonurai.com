import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "../../../components/Layout";
import algoliasearch from "algoliasearch/lite";
import {
  useInstantSearch,
  InstantSearch,
  SearchBox,
  Highlight,
  Pagination,
  useHits,
  UseHitsProps,
  RefinementList,
} from "react-instantsearch";

const searchClient = algoliasearch(
  "C2HE5P5XXN",
  "d2c8fc1252a7738a63c4ca3c8b96eea5"
);

export default function Search() {
  const pageTitle = `Search - Bing Wallpapers - ${process.env.NEXT_PUBLIC_NAME}`;
  return (
    <Layout pageTitle={pageTitle}>
      <h1 className="text-3xl mb-2 text-white mx-4 md:mx-0">
        Search - Bing Wallpapers
      </h1>
      <InstantSearch
        searchClient={searchClient}
        indexName="wallpapers"
        future={{ preserveSharedStateOnUnmount: true }}
        insights
      >
        <SearchBox
          placeholder="Search wallpapers"
          queryHook={debounceQuery}
          classNames={{
            root: "mx-4 md:mx-0",
            input:
              "block px-3 py-2 bg-white border border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 rounded-md focus:ring-1",
          }}
        />
        <RefinementList
          attribute="tagsOrdered"
          searchable={true}
          searchablePlaceholder="Search tags"
          showMore={true}
          operator="and"
          classNames={{
            root: "mx-4 md:mx-0",
            count: "ml-2",
            labelText: "ml-2 text-white",
          }}
        />
        <EmptyQueryBoundary fallback={null}>
          <NoResultsBoundary fallback={<NoResults />}>
            {getPagination()}
            <CustomHits />
            {getPagination()}
          </NoResultsBoundary>
        </EmptyQueryBoundary>
      </InstantSearch>
    </Layout>
  );
}
let timerId: any = undefined;
let timeout = 500;
function debounceQuery(query: string, search: any) {
  if (timerId) {
    clearTimeout(timerId);
  }

  timerId = setTimeout(() => search(query), timeout);
}

function getPagination() {
  return (
    <Pagination
      showFirst={false}
      showLast={false}
      classNames={{
        root: "pagination my-4 mx-4 md:mx-0",
        item: "inline-block rounded-md",
        pageItem: "text-gray-300 hover:bg-slate-700 hover:text-white",
        selectedItem: "text-white font-bold bg-blue-500",
        disabledItem:
          "bg-slate-900 hover:bg-slate-900 text-gray-500 hover:text-gray-500",
        link: "px-3 py-2 block",
      }}
    />
  );
}

function CustomHits(props: UseHitsProps) {
  const { hits } = useHits(props);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
      {hits.map((hit, i) => {
        const { id, title }: any = hit;
        return (
          <figure
            key={id}
            className="wallpaper relative mb-12 md:mb-0 last:mb-0"
          >
            <Link prefetch={false} href={`/bingwallpapers/${id}`} title={title}>
              <Image
                unoptimized={true}
                src={`https://img2.sonurai.com/${id}.jpg`}
                width={1920}
                height={1200}
                priority={i < 3}
                alt={title}
              />
              <figcaption className="caption md:hidden md:absolute md:bottom-0 md:left-0 mx-4 md:mx-0 md:p-4 mt-3 md:mt-0 md:h-full md:w-full md:text-2xl md:bg-black md:bg-opacity-80 md:text-white">
                <Highlight attribute="title" hit={hit} />
              </figcaption>
            </Link>
          </figure>
        );
      })}
    </div>
  );
}

interface FallbackProps {
  children: ReactNode;
  fallback: ReactNode;
}

function EmptyQueryBoundary({ children, fallback }: FallbackProps) {
  const { indexUiState } = useInstantSearch();

  if (!indexUiState.query) {
    return fallback;
  }

  return children;
}

function NoResultsBoundary({ children, fallback }: FallbackProps) {
  const { results } = useInstantSearch();

  // The `__isArtificial` flag makes sure not to display the No Results message
  // when no hits have been returned.
  if (!results.__isArtificial && results.nbHits === 0) {
    return (
      <>
        {fallback}
        <div hidden>{children}</div>
      </>
    );
  }

  return children;
}

function NoResults() {
  const { indexUiState } = useInstantSearch();

  return (
    <div>
      <p>
        No results for <q>{indexUiState.query}</q>.
      </p>
    </div>
  );
}
