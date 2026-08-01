"use client";

import { ReactNode } from "react";
import { liteClient } from "algoliasearch/lite";
import {
  useInstantSearch,
  InstantSearch,
  SearchBox,
  Highlight,
  Pagination,
  useHits,
  UseHitsProps,
} from "react-instantsearch";
import WallpaperCard from "@/components/WallpaperCard";

const searchClient = liteClient(
  "C2HE5P5XXN",
  "d2c8fc1252a7738a63c4ca3c8b96eea5",
);

type WallpaperHit = {
  id: string;
  title: string;
  colors?: string[];
  urlBase?: string;
};

export function Search() {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="wallpapers"
      future={{ preserveSharedStateOnUnmount: true }}
      insights
    >
      <SearchBox
        placeholder="Search by location, subject, or keyword..."
        queryHook={debounceQuery}
        classNames={{
          root: "content-margin",
          form: "relative",
          input: "w-full px-4 py-3 bg-white/5 border border-white/10 placeholder-gray-500 text-white rounded-lg focus:outline-none focus:border-white/25 focus:ring-1 focus:ring-white/25 text-lg",
          submit: "hidden",
          reset: "hidden",
          loadingIndicator: "hidden",
        }}
      />
      <EmptyQueryBoundary fallback={
        <div className="content-margin mt-12 text-center text-gray-600">
          <p className="text-lg">Find wallpapers by location, subject, or season</p>
        </div>
      }>
        <LoadingIndicator />
        <NoResultsBoundary fallback={<NoResults />}>
          {getPagination()}
          <CustomHits />
          {getPagination()}
        </NoResultsBoundary>
      </EmptyQueryBoundary>
    </InstantSearch>
  );
}

const debounceQuery = (() => {
  const timeout = 500;
  let timerId: ReturnType<typeof setTimeout> | undefined;

  return (query: string, search: (query: string) => void) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => search(query), timeout);
  };
})();

function getPagination() {
  return (
    <Pagination
      showFirst={false}
      showLast={false}
      classNames={{
        root: "pagination my-4 content-margin",
        item: "inline-block rounded-md",
        pageItem: "text-gray-300 hover:bg-slate-700 hover:text-white",
        selectedItem: "text-white font-bold bg-gray-800",
        disabledItem: "bg-dark-primary text-slate-950 hover:bg-dark-primary hover:text-slate-950",
        link: "px-3 py-2 block",
      }}
    />
  );
}

function CustomHits(props: UseHitsProps<WallpaperHit>) {
  const { items, sendEvent } = useHits(props);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
      {items.map((hit, i) => (
        <WallpaperCard
          key={hit.id}
          id={hit.id}
          title={hit.title}
          colors={hit.colors}
          urlBase={hit.urlBase}
          priority={i < 3}
          caption={<Highlight attribute="title" hit={hit} />}
          onClick={() => sendEvent("click", hit, "Hit Clicked")}
        />
      ))}
    </div>
  );
}

interface FallbackProps {
  children: ReactNode;
  fallback: ReactNode;
}

function LoadingIndicator() {
  const { status } = useInstantSearch();

  if (status === "loading" || status === "stalled") {
    return (
      <div className="my-6 content-margin flex items-center gap-2 text-gray-500">
        <span className="inline-block w-4 h-4 border-2 border-gray-600 border-t-gray-300 rounded-full animate-spin" />
        Searching...
      </div>
    );
  }

  return null;
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
    <div className="content-margin mt-8 text-center">
      <p className="text-gray-400">No results for <q className="text-white">{indexUiState.query}</q></p>
      <p className="text-sm text-gray-600">Try a different keyword or check your spelling</p>
    </div>
  );
}
