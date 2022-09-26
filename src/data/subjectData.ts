export enum MAIN_SUBJECTS {
  국어,
  수학,
  사회,
  과학,
}

export const DETAIL_SUBJECTS = {
  [MAIN_SUBJECTS.국어]: ["화법과 작문", "엉어와 매체"],
  [MAIN_SUBJECTS.수학]: ["미적분, 기하", "확률과 통계"],
  [MAIN_SUBJECTS.사회]: [
    "생활과 윤리",
    "윤라와 사상",
    " 정치와 법",
    "한국지리",
    "세계지리",
    "경제",
    "동아시아사",
    "세계사",
    "사회·문화",
  ],
  [MAIN_SUBJECTS.과학]: [
    "물리학1",
    "물리학2",
    "화학1",
    "화학2",
    "생명과학1",
    "생명과학2",
    "지구과학1",
    "지구과학2",
  ],
};
