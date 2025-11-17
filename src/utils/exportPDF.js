import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

export async function downloadPDF() {
  const element = document.getElementById("pdf-export");

  if (!element) {
    alert("PDF element not found!");
    return;
  }

  // Wait to ensure charts render
  await new Promise((res) => setTimeout(res, 800));

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
      logging: true,
    });

    const imgData = canvas.toDataURL("image/png");

    if (!imgData.startsWith("data:image")) {
      throw new Error("Canvas returned invalid image");
    }

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();

    const imgProps = pdf.getImageProperties(imgData);
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("expense-report.pdf");
  } catch (err) {
    console.error("PDF ERROR:", err);
    alert("PDF failed. Check console for details.");
  }
}
