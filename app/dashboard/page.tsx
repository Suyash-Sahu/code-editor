import { delectProjectById, duplicateProjectById, editProjectById, getAllPlaygroundForUser } from '@/modules/dashboard/actions';
import AddNewButton from '@/modules/dashboard/components/add-new'
import AddRepo from '@/modules/dashboard/components/add-repo'
import EmptyState from '@/modules/dashboard/components/empty-state';
import ProjectTable from '@/modules/dashboard/components/project-table';
import React from 'react'

const Page = async () => {
  const playgrounds = await getAllPlaygroundForUser();

  return (
    <div className="flex flex-col justify-start items-center min-h-screen mx-auto max-w-7xl px-4 py-10">
      {/* Header Section */}
      <div className="w-full mb-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#256DA4] via-[#83B7DE] to-[#74FF9E] dark:from-[#83B7DE] dark:via-[#74FF9E] dark:to-[#F2FF58] bg-clip-text text-transparent">
            Your Projects
          </h1>
          <p className="text-sm text-[#256DA4]/70 dark:text-[#83B7DE]/80">
            Create, manage, and organize your coding projects
          </p>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <div className="group relative overflow-hidden rounded-xl border border-[#83B7DE]/20 dark:border-[#74FF9E]/20 bg-gradient-to-br from-white to-[#83B7DE]/5 dark:from-zinc-900 dark:to-[#74FF9E]/5 hover:border-[#83B7DE]/40 dark:hover:border-[#74FF9E]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#83B7DE]/10 dark:hover:shadow-[#74FF9E]/10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#83B7DE]/0 via-[#83B7DE]/5 to-[#74FF9E]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <AddNewButton />
        </div>
        
        <div className="group relative overflow-hidden rounded-xl border border-[#ABB900]/20 dark:border-[#F2FF58]/20 bg-gradient-to-br from-white to-[#ABB900]/5 dark:from-zinc-900 dark:to-[#F2FF58]/5 hover:border-[#ABB900]/40 dark:hover:border-[#F2FF58]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#ABB900]/10 dark:hover:shadow-[#F2FF58]/10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#ABB900]/0 via-[#ABB900]/5 to-[#F2FF58]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <AddRepo />
        </div>
      </div>

      {/* Stats Section (Optional) */}
      {playgrounds && playgrounds.length > 0 && (
        <div className="mt-8 w-full">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-[#83B7DE]/10 via-[#74FF9E]/10 to-[#F2FF58]/10 dark:from-[#83B7DE]/5 dark:via-[#74FF9E]/5 dark:to-[#F2FF58]/5 border border-[#83B7DE]/20 dark:border-[#74FF9E]/20">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#74FF9E] animate-pulse"></div>
              <span className="text-sm font-medium text-[#256DA4] dark:text-[#83B7DE]">
                {playgrounds.length} {playgrounds.length === 1 ? 'Project' : 'Projects'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Projects Table/Empty State */}
      <div className="mt-10 flex flex-col justify-center items-center w-full">
        {playgrounds && playgrounds.length === 0 ? (
          <div className="w-full flex justify-center items-center py-12">
            <div className="relative">
              {/* Decorative background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#83B7DE]/10 via-[#74FF9E]/10 to-[#F2FF58]/10 blur-3xl rounded-full"></div>
              <div className="relative z-10">
                <EmptyState />
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full rounded-xl border border-[#83B7DE]/20 dark:border-[#74FF9E]/20 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm overflow-hidden shadow-lg shadow-[#83B7DE]/5 dark:shadow-[#74FF9E]/5">
            <ProjectTable
              projects={playgrounds || []}
              onDeleteProject={delectProjectById}
              onUpdateProject={editProjectById}
              onDuplicateProject={duplicateProjectById}
            />
          </div>
        )}
      </div>

      {/* Footer Info */}
      {playgrounds && playgrounds.length > 0 && (
        <div className="mt-8 w-full flex justify-center">
          <p className="text-xs text-[#256DA4]/60 dark:text-[#83B7DE]/60 text-center">
            Tip: Click on any project to open it in the editor
          </p>
        </div>
      )}
    </div>
  );
};

export default Page;