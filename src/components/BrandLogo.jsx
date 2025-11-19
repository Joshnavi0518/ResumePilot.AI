import logo from '../assets/resumePilotLogo.svg'

function BrandLogo() {
  return (
    <div className="d-flex align-items-center gap-3">
      <img src={logo} alt="ResumePilot.AI logo" width={44} height={44} className="rounded-3" />
      <div>
        <p className="text-uppercase text-primary fw-semibold mb-0 small letter-spacing-wide">
          ResumePilot.AI
        </p>
        <p className="mb-0 text-muted small">Precision AI Resume Suite</p>
      </div>
    </div>
  )
}

export default BrandLogo


