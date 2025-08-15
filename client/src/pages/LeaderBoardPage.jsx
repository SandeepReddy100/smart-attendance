import React, { useState, useEffect, useMemo } from 'react';
import { Trophy, Medal, Award, Search, Filter, ChevronDown, Crown } from 'lucide-react';

// --- MOCK DATA (UNCHANGED) ---
const candidates = [
  { _id: "688277b477a7cc5aebb0d424", rollno: "23951A66H8", branch: "CSE(AI & ML)", batch: "SU-B2", handles: { leetcode: "mohammadazaruddin", gfg: "mohammadazaruddinshaik", codechef: "shaikazaruddin" }, scores: { leetcode: 518, gfg: 349, codechef: 257 }, totalScore: 1124, lastUpdated: "2025-08-12T04:28:44.182Z" },
  { _id: "688277b477a7cc5aebb0d425", rollno: "23951A66J2", branch: "CSE", batch: "SU-B1", handles: { leetcode: "priyansh2025", gfg: "priyansh_gfg", codechef: "priyansh_cc" }, scores: { leetcode: 610, gfg: 420, codechef: 310 }, totalScore: 1340, lastUpdated: "2025-08-10T12:15:20.000Z" },
  { _id: "688277b477a7cc5aebb0d426", rollno: "23951A66B4", branch: "IT", batch: "SU-B3", handles: { leetcode: "ananya_2025", gfg: "ananya_codes", codechef: "ananya_cc" }, scores: { leetcode: 300, gfg: 280, codechef: 150 }, totalScore: 730, lastUpdated: "2025-08-13T09:50:00.000Z" },
  { _id: "688277b477a7cc5aebb0d427", rollno: "23951A66D9", branch: "CSE", batch: "SU-B2", handles: { leetcode: "rahul_2106", gfg: "rahul_gfg", codechef: "rahul_cc" }, scores: { leetcode: 480, gfg: 350, codechef: 260 }, totalScore: 1090, lastUpdated: "2025-08-14T08:00:00.000Z" },
  { _id: "688277b477a7cc5aebb0d428", rollno: "23951A66K5", branch: "CSE(AI & DS)", batch: "SU-B4", handles: { leetcode: "divya_codes", gfg: "divya_gfg", codechef: "divya_cc" }, scores: { leetcode: 420, gfg: 390, codechef: 280 }, totalScore: 1090, lastUpdated: "2025-08-11T18:45:00.000Z" },
  { _id: "688277b477a7cc5aebb0d429", rollno: "23951A66M1", branch: "ECE", batch: "SU-B2", handles: { leetcode: "sai_kiran", gfg: "sai_gfg", codechef: "sai_cc" }, scores: { leetcode: 510, gfg: 260, codechef: 320 }, totalScore: 1090, lastUpdated: "2025-08-09T15:15:00.000Z" },
  { _id: "688277b477a7cc5aebb0d430", rollno: "23951A66P3", branch: "EEE", batch: "SU-B5", handles: { leetcode: "arjun_dev", gfg: "arjun_gfg", codechef: "arjun_cc" }, scores: { leetcode: 200, gfg: 480, codechef: 210 }, totalScore: 890, lastUpdated: "2025-08-07T16:00:00.000Z" },
  { _id: "688277b477a7cc5aebb0d431", rollno: "23951A66Q4", branch: "MECH", batch: "SU-B1", handles: { leetcode: "nithin2002", gfg: "nithin_gfg", codechef: "nithin_cc" }, scores: { leetcode: 250, gfg: 300, codechef: 100 }, totalScore: 650, lastUpdated: "2025-08-08T14:22:00.000Z" },
  { _id: "688277b477a7cc5aebb0d432", rollno: "23951A66S6", branch: "CSE", batch: "SU-B2", handles: { leetcode: "meghana_dev", gfg: "meghana_gfg", codechef: "meghana_cc" }, scores: { leetcode: 550, gfg: 420, codechef: 350 }, totalScore: 1320, lastUpdated: "2025-08-13T21:30:00.000Z" },
  { _id: "688277b477a7cc5aebb0d433", rollno: "23951A66U9", branch: "IT", batch: "SU-B3", handles: { leetcode: "manojcoder", gfg: "manoj_gfg", codechef: "manoj_cc" }, scores: { leetcode: 340, gfg: 330, codechef: 190 }, totalScore: 860, lastUpdated: "2025-08-12T10:10:00.000Z" }
];
const additionalCandidates = Array.from({ length: 150 }, (_, i) => ({_id: `mock_${i}`, rollno: `23951A66${String.fromCharCode(65 + (i % 26))}${i + 50}`, branch: ['CSE', 'IT', 'ECE', 'EEE', 'MECH', 'CSE(AI & ML)', 'CSE(AI & DS)'][i % 7], batch: `SU-B${(i % 5) + 1}`, handles: { leetcode: `user_${i + 50}_${String.fromCharCode(97 + (i % 26))}`, gfg: `user${i + 50}_gfg`, codechef: `user${i + 50}_cc`}, scores: { leetcode: Math.floor(Math.random() * 500) + 100, gfg: Math.floor(Math.random() * 400) + 100, codechef: Math.floor(Math.random() * 300) + 50 }, totalScore: 0, lastUpdated: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 10).toISOString()}));
additionalCandidates.forEach(c => { c.totalScore = c.scores.leetcode + c.scores.gfg + c.scores.codechef; });
const allCandidates = [...candidates, ...additionalCandidates];


// --- MAIN COMPONENT ---

const LeaderBoard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRange, setSelectedRange] = useState('1-50');
  const [showDropdown, setShowDropdown] = useState(false);

  // NOTE: Assuming this is the logged-in user for the sticky bar at the bottom
  const currentUserRollNo = "23951A66H8";

  const sortedCandidates = useMemo(() => 
    [...allCandidates].sort((a, b) => b.totalScore - a.totalScore),
    []
  );

  const { currentUserData, currentUserRank } = useMemo(() => {
    const rank = sortedCandidates.findIndex(c => c.rollno === currentUserRollNo) + 1;
    const data = sortedCandidates.find(c => c.rollno === currentUserRollNo);
    return { currentUserData: data, currentUserRank: rank };
  }, [sortedCandidates, currentUserRollNo]);

  
  const filteredCandidates = useMemo(() => {
    return sortedCandidates.filter(candidate => {
      const query = searchQuery.toLowerCase();
      const nameMatch = candidate.handles.leetcode.toLowerCase().includes(query);
      const rollnoMatch = candidate.rollno.toLowerCase().includes(query);
      return nameMatch || rollnoMatch;
    });
  }, [sortedCandidates, searchQuery]);

  const paginatedCandidates = useMemo(() => {
      if (searchQuery) {
          return filteredCandidates; // Don't paginate when searching
      }
      const [start, end] = selectedRange.split('-').map(Number);
      return filteredCandidates.slice(start - 1, end);
  }, [filteredCandidates, selectedRange, searchQuery]);
  

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const topThree = sortedCandidates.slice(0, 3);
  const otherCandidates = paginatedCandidates.filter(c => !topThree.some(t => t._id === c._id));

  const filterOptions = ['1-50', '51-100', '101-150', '151-200'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl mb-6 shadow-2xl">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-black bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 bg-clip-text text-transparent mb-3">
            LeaderBoard
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Compete, Learn, and Rise
          </p>
        </div>

        {/* Top 3 Winners - New Card Layout */}
        <div className={`mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-8">🏆 Hall of Fame</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* 1st Place - Gold */}
            {topThree[0] && (
              <div className="relative bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 p-6 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300 md:order-2">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-white rounded-full p-3 shadow-lg">
                    <Crown className="w-8 h-8 text-yellow-600" />
                  </div>
                </div>
                <div className="text-center text-white mt-4">
                  <div className="text-4xl font-black mb-2">1st</div>
                  <div className="bg-white/20 backdrop-blur rounded-2xl p-4 mb-4">
                    <h3 className="font-bold text-lg mb-1 truncate">{topThree[0].handles.leetcode}</h3>
                    <p className="text-sm opacity-90">{topThree[0].branch}</p>
                    <div className="text-3xl font-bold mt-3">{topThree[0].totalScore}</div>
                  </div>
                  <div className="flex justify-around text-sm">
                    <div><p className="opacity-80 text-xs">LeetCode</p><p className="font-semibold">{topThree[0].scores.leetcode}</p></div>
                    <div><p className="opacity-80 text-xs">GfG</p><p className="font-semibold">{topThree[0].scores.gfg}</p></div>
                    <div><p className="opacity-80 text-xs">CodeChef</p><p className="font-semibold">{topThree[0].scores.codechef}</p></div>
                  </div>
                </div>
              </div>
            )}

            {/* 2nd Place - Silver */}
            {topThree[1] && (
              <div className="relative bg-gradient-to-br from-slate-400 via-slate-500 to-slate-600 p-6 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300 md:order-1">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-white rounded-full p-3 shadow-lg">
                    <Medal className="w-8 h-8 text-slate-600" />
                  </div>
                </div>
                <div className="text-center text-white mt-4">
                  <div className="text-3xl font-black mb-2">2nd</div>
                  <div className="bg-white/20 backdrop-blur rounded-2xl p-4 mb-4">
                    <h3 className="font-bold text-lg mb-1 truncate">{topThree[1].handles.leetcode}</h3>
                    <p className="text-sm opacity-90">{topThree[1].branch}</p>
                    <div className="text-2xl font-bold mt-3">{topThree[1].totalScore}</div>
                  </div>
                  <div className="flex justify-around text-sm">
                    <div><p className="opacity-80 text-xs">LeetCode</p><p className="font-semibold">{topThree[1].scores.leetcode}</p></div>
                    <div><p className="opacity-80 text-xs">GfG</p><p className="font-semibold">{topThree[1].scores.gfg}</p></div>
                    <div><p className="opacity-80 text-xs">CodeChef</p><p className="font-semibold">{topThree[1].scores.codechef}</p></div>
                  </div>
                </div>
              </div>
            )}

            {/* 3rd Place - Bronze */}
            {topThree[2] && (
              <div className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 p-6 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300 md:order-3">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-white rounded-full p-3 shadow-lg">
                    <Award className="w-8 h-8 text-orange-600" />
                  </div>
                </div>
                <div className="text-center text-white mt-4">
                  <div className="text-3xl font-black mb-2">3rd</div>
                  <div className="bg-white/20 backdrop-blur rounded-2xl p-4 mb-4">
                    <h3 className="font-bold text-lg mb-1 truncate">{topThree[2].handles.leetcode}</h3>
                    <p className="text-sm opacity-90">{topThree[2].branch}</p>
                    <div className="text-2xl font-bold mt-3">{topThree[2].totalScore}</div>
                  </div>
                  <div className="flex justify-around text-sm">
                    <div><p className="opacity-80 text-xs">LeetCode</p><p className="font-semibold">{topThree[2].scores.leetcode}</p></div>
                    <div><p className="opacity-80 text-xs">GfG</p><p className="font-semibold">{topThree[2].scores.gfg}</p></div>
                    <div><p className="opacity-80 text-xs">CodeChef</p><p className="font-semibold">{topThree[2].scores.codechef}</p></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className={`bg-white rounded-2xl p-6 mb-8 shadow-lg border border-slate-200 transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-1">Complete Rankings</h2>
              <p className="text-slate-600">Track everyone's progress and see where you stand</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name or roll number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full lg:w-80 pl-12 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center justify-between gap-3 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition-colors min-w-[140px]"
                >
                  <Filter className="w-5 h-5" />
                  <span>Ranks {selectedRange}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                </button>
                {showDropdown && (
                  <div className="absolute top-full mt-2 right-0 bg-white rounded-xl border border-slate-200 shadow-xl w-48 z-10 overflow-hidden">
                    {filterOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => { setSelectedRange(option); setShowDropdown(false); }}
                        className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors ${selectedRange === option ? 'bg-blue-100 font-semibold text-blue-700' : 'text-slate-700'}`}
                      >
                        Ranks {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Rankings Table */}
        <div className={`transition-all duration-1000 delay-700 pb-32 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
            {/* Table Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4">
              <div className="grid grid-cols-12 gap-4 items-center font-semibold">
                <div className="col-span-1 text-center">#</div>
                <div className="col-span-5 lg:col-span-4">Participant</div>
                <div className="col-span-6 lg:col-span-5 text-center">Platform Scores</div>
                <div className="hidden lg:block lg:col-span-2 text-center">Total</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-slate-100">
              {otherCandidates.length > 0 ? otherCandidates.map((candidate) => {
                const rank = sortedCandidates.findIndex(c => c._id === candidate._id) + 1;
                const isCurrentUser = candidate.rollno === currentUserRollNo;
                
                return (
                  <div key={candidate._id} className={`grid grid-cols-12 gap-4 items-center p-4 hover:bg-blue-50 transition-colors ${isCurrentUser ? 'bg-blue-50 border-l-4 border-blue-500' : ''}`}>
                    {/* Rank */}
                    <div className="col-span-1 text-center">
                      <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                        rank <= 10 ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {rank}
                      </div>
                    </div>

                    {/* Participant Info */}
                    <div className="col-span-5 lg:col-span-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {candidate.handles.leetcode.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className={`font-semibold text-slate-800 truncate ${isCurrentUser ? 'text-blue-700' : ''}`}>
                            {candidate.handles.leetcode} {isCurrentUser && <span className="text-blue-600">(You)</span>}
                          </h3>
                          <p className="text-sm text-slate-500">{candidate.rollno} • {candidate.branch}</p>
                        </div>
                      </div>
                    </div>

                    {/* Platform Scores */}
                    <div className="col-span-6 lg:col-span-5">
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-center bg-slate-100 rounded-lg py-1 px-1">
                          <p className="text-xs font-medium text-slate-600">LeetCode</p>
                          <p className="font-bold text-slate-800">{candidate.scores.leetcode}</p>
                        </div>
                        <div className="text-center bg-slate-100 rounded-lg py-1 px-1">
                          <p className="text-xs font-medium text-slate-600">GfG</p>
                          <p className="font-bold text-slate-800">{candidate.scores.gfg}</p>
                        </div>
                        <div className="text-center bg-slate-100 rounded-lg py-1 px-1">
                          <p className="text-xs font-medium text-slate-600">CodeChef</p>
                          <p className="font-bold text-slate-800">{candidate.scores.codechef}</p>
                        </div>
                      </div>
                    </div>

                    {/* Total Score - Hidden on mobile */}
                    <div className="hidden lg:block lg:col-span-2 text-center">
                      <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        {candidate.totalScore}
                      </div>
                    </div>
                  </div>
                );
              }) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                    <Search className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-700 mb-2">No results found</h3>
                  <p className="text-slate-500">Try adjusting your search terms or filter settings</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky User Position Bar */}
      {currentUserData && (
        <div className="fixed bottom-0 left-0 right-0 p-4 pointer-events-none">
            <div className="max-w-6xl mx-auto bg-white/95 backdrop-blur-md border border-slate-200 shadow-2xl z-50 rounded-2xl p-4 pointer-events-auto">
                <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-xl shadow-lg">
                    #{currentUserRank}
                    </div>
                    <div>
                    <h3 className="font-bold text-slate-800">{currentUserData.handles.leetcode}</h3>
                    <p className="text-sm text-slate-600">{currentUserData.rollno} • Your Position</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-6">
                    <div className="hidden sm:flex items-center gap-4">
                        <div className="text-center">
                            <p className="text-xs font-medium text-slate-600">LeetCode</p>
                            <p className="font-bold text-slate-800">{currentUserData.scores.leetcode}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs font-medium text-slate-600">GfG</p>
                            <p className="font-bold text-slate-800">{currentUserData.scores.gfg}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs font-medium text-slate-600">CodeChef</p>
                            <p className="font-bold text-slate-800">{currentUserData.scores.codechef}</p>
                        </div>
                    </div>
                    
                    <div className="text-right">
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        {currentUserData.totalScore}
                    </div>
                    <div className="text-xs text-slate-600">Total Score</div>
                    </div>
                </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default LeaderBoard;