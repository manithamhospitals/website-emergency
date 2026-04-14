;(function () {
  function getBasePath() {
    var currentScript = document.currentScript;
    if (!currentScript) {
      return "";
    }

    var src = currentScript.getAttribute("src") || "";
    var marker = "assets/js/department-doctors.js";
    var markerIndex = src.lastIndexOf(marker);

    return markerIndex === -1 ? "" : src.slice(0, markerIndex);
  }

  var basePath = getBasePath();

  var doctorsByDepartment = {
    "general-medicine": [
      {
        name: "Dr Nivetha G",
        credentials: "MD",
        specialty: "General Medicine",
        image: "assets/img/all-images/team/team-img29.png"
      }
    ],
    "gastroenterology": [
      {
        name: "Dr Sakthi Srinivas",
        credentials: "MBBS., MD, DM",
        specialty: "Medical Gastroenterology",
        image: "assets/img/all-images/team/team-img11.png"
      },
      {
        name: "Dr Livin Jose",
        credentials: "MCh SGE",
        specialty: "Surgical Gastroenterology",
        image: "assets/img/all-images/team/team-img41.png"
      }
    ],
    "paediatrics": [
      {
        name: "Dr Lingeswaran M",
        credentials: "MBBS, MD",
        specialty: "Pediatrician",
        image: "assets/img/all-images/team/team-img13.png"
      }
    ],
    "cardiology": [
      {
        name: "Dr Vaira Muthu Pandian P",
        credentials: "MBBS, MD, DM",
        specialty: "Cardiologist",
        image: "assets/img/all-images/team/team-img32.png"
      },
      {
        name: "Dr Liju",
        credentials: "MD",
        specialty: "Cardiology",
        image: "assets/img/all-images/team/team-img35.png"
      }
    ],
    "nephrology": [
      {
        name: "Dr Raja S",
        credentials: "M.D. (General Medicine), D.M. (Nephrology)",
        specialty: "Nephrology",
        image: "assets/img/all-images/team/team-img10.png"
      }
    ],
    "dermatology": [
      {
        name: "Dr Gajendran",
        credentials: "MBBS., MD",
        specialty: "Dermatologist",
        image: "assets/img/all-images/team/team-img37.png"
      }
    ],
    "psychiatry": [
      {
        name: "Dr A. Sangeetha",
        credentials: "MD",
        specialty: "Psychiatrist",
        image: "assets/img/all-images/team/team-img38.png"
      }
    ],
    "medical-oncology": [
      {
        name: "Dr Sivasubramaniam K",
        credentials: "MBBS., M.D., D.M., E.C.M.O",
        specialty: "Medical Oncologist",
        image: "assets/img/all-images/team/team-img12.png"
      }
    ],
    "neurology": [
      {
        name: "Dr N. Shanmuga Sundaram",
        credentials: "MD, DM",
        specialty: "Neurology",
        image: "assets/img/all-images/service/Neurology.png"
      }
    ],
    "pulmonology": [
      {
        name: "Dr Dakshinamurthy B",
        credentials: "DTCD, DNB",
        specialty: "Pulmonologist",
        image: "assets/img/all-images/team/team-img31.png"
      }
    ]
  };

  function createDoctorCard(doctor) {
    return [
      '<article class="department-doctor-card">',
      '  <div class="department-doctor-card__image">',
      '    <img src="' + basePath + doctor.image + '" alt="' + doctor.name + '">',
      "  </div>",
      '  <div class="department-doctor-card__content">',
      '    <h4>' + doctor.name + "</h4>",
      '    <p class="department-doctor-card__credentials">' + doctor.credentials + "</p>",
      '    <p class="department-doctor-card__specialty">' + doctor.specialty + "</p>",
      '    <a href="' + basePath + 'contact.html" class="vl-btn4 department-doctor-card__cta">Book an Appointment</a>',
      "  </div>",
      "</article>"
    ].join("");
  }

  function renderDepartmentDoctors() {
    var sections = document.querySelectorAll(".department-doctors[data-department]");

    sections.forEach(function (section) {
      var departmentKey = section.getAttribute("data-department");
      var doctors = doctorsByDepartment[departmentKey] || [];
      var heading = section.getAttribute("data-title") || "Department Specialists";

      if (!doctors.length) {
        section.innerHTML = '<h3>' + heading + "</h3><p>No doctors available for this department right now.</p>";
        return;
      }

      section.innerHTML = [
        '<h3>' + heading + "</h3>",
        '<div class="space20"></div>',
        '<div class="department-doctor-list">',
        doctors.map(createDoctorCard).join(""),
        "</div>"
      ].join("");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderDepartmentDoctors);
  } else {
    renderDepartmentDoctors();
  }
})();
