const AddProjectPage = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <div className="h-20 bg-white border-b flex items-center justify-between px-8">
        <h1 className="text-3xl font-semibold text-[#1f4d46]">
          Add a New Project
        </h1>

        <div className="flex items-center gap-4">
          <button className="relative">
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-orange-500" />
            🔔
          </button>

          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/40"
              alt="user"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm font-medium">Upskilling</p>
              <p className="text-xs text-gray-500">
                upskilling.eg@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-6">
        <a href="/projects" className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800">
          ← View All Projects
        </a>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
            <form className="space-y-8">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Title
                </label>

                <input
                  type="text"
                  placeholder="Name"
                  className="w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Description
                </label>

                <textarea
                  rows={5}
                  placeholder="Description"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none resize-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
                />
              </div>

              {/* Divider */}
              <div className="border-t" />

              {/* Actions */}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  className="px-8 py-3 rounded-full border border-gray-500 text-gray-700 font-medium hover:bg-gray-50 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-8 py-3 rounded-full bg-[#f4a024] text-white font-medium hover:bg-[#e29012] transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProjectPage;