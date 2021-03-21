export const monitorContentsTemplate = ({ title, thumbnailSrc }) => `
<div class="mac_content">
  <div class="title">
    <div class="line_container" style="margin-right:20px;">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
    <span>${title}</span>
    <div class="line_container" style="margin-left:20px;">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
  </div>
  <div class="summary">
      <div>
        <div class="summary_title"># ${title}</div>
        <div class="summary_content">
          <img class="summary_img" loading="lazy" width="150px" height="150px" alt="프로젝트 섬네일" src="${thumbnailSrc}"/>
        </div>
      </div>
  </div>
</div>
`;

export const infoContentsTemplate = ({
  title,
  imgSrc,
  techStack = [],
  summary,
  level,
  description,
  period,
  link = "",
  github = "",
}) => `
    <div class="info_content" >
        <div class="content_wrapper">
            <div class="upper_wrapper">
                <div class="m_image" style="background-image:url(${imgSrc})"></div>
                <div class="upper_right_wrapper">
                    <div class="title">
                        <strong>${title}</strong>
                        <div class="line"></div>
                    </div>
                    <div class="summary">${summary}</div>
                    <div class="tech_stack_container">
                        ${techStack
                          .map(
                            (skill) => `<div class="tech_stack">${skill}</div>`
                          )
                          .join("")}
                    </div>
                    <div class="content_link_wrapper">
                        ${
                          link !== ""
                            ? `<div class="link link_item"><a href="${link}" target="_blank"><i class="fas fa-link"></i>Link</a></div>`
                            : ""
                        }
                        ${
                          github !== ""
                            ? `<div class="github link_item"><a href="${github}" target="_blank"><i class="fab fa-github"></i>Github</a></div>`
                            : ""
                        }
                        </div>
                </div>
            </div>
            <div class="description">
                <div class="p_image" style="background-image:url(${imgSrc})"></div>
                &nbsp&nbsp${description}
            </div>
           
        </div>
    </div>
`;

export const template = ({ views }) => `
    <div class="projects_container" style="display:none;">
      <div class="mac_container" >
        <p style="font-size:2.5rem;font-weight:bold;color:gray;">
          제가 진행한 소중한 <strong>프로젝트</strong>들입니다
        </p>
        <img class="mac_img">
        <div class="mac_monitor_container">
          <div class="mac_contents_container">
            ${monitorContentsTemplate(views[0])}
          </div>
          <div class="mac_arrow_container arrow_container">
            <button class="mac_monitor_arrow_left">
              <span class="arrow arrow-left"></span>
            </button>
            <button class="mac_monitor_arrow_right">
              <span class="arrow arrow-right"></span>
            </button>
          </div>
          <button class="mac_monitor_search">
            <i class="fas fa-search 5x"></i>
          </button>
        </div>
      </div>
      <div class="project_info_container">
        <div class="cover "></div>
        <div class="info_container">
            ${infoContentsTemplate(views[0])}
        </div>
        <div class="info_arrow_container arrow_container">
            <button class="info_monitor_arrow_left">
                <span class="arrow arrow-left"></span>
            </button>
            <button class="info_monitor_arrow_right">
                <span class="arrow arrow-right"></span>
            </button>
        </div>
      </div>
    </div>
`;
