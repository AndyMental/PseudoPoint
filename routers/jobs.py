from fastapi import APIRouter, HTTPException
from typing import List

router = APIRouter()

class JobPosting:
    def __init__(self, title: str, company: str, location: str, description: str, requirements: List[str]):
        self.title = title
        self.company = company
        self.location = location
        self.description = description
        self.requirements = requirements

job_postings = [
    JobPosting("Software Engineer", "Acme Corp", "San Francisco, CA", "We're looking for a software engineer to join our team and help us build the next generation of products.", ["Bachelor's degree in Computer Science or related field", "3+ years of experience in software engineering", "Proficiency in Python and JavaScript"]),
    JobPosting("Data Analyst", "Beta Inc", "New York, NY", "We're seeking a data analyst to help us analyze and interpret complex data sets and provide insights to our stakeholders.", ["Bachelor's degree in Statistics, Mathematics, or related field", "2+ years of experience in data analysis", "Proficiency in SQL and Excel"]),
    JobPosting("Product Manager", "Gamma Corp", "Seattle, WA", "We're looking for a product manager to lead the development of our flagship product and drive growth for our company.", ["Bachelor's degree in Business Administration or related field", "5+ years of experience in product management", "Experience with Agile development methodologies"]),
    JobPosting("Marketing Specialist", "Delta Inc", "Chicago, IL", "We're seeking a marketing specialist to help us develop and execute marketing campaigns that drive customer acquisition and retention.", ["Bachelor's degree in Marketing or related field", "3+ years of experience in marketing", "Experience with social media advertising and email marketing"]),
    JobPosting("Sales Representative", "Epsilon Corp", "Austin, TX", "We're looking for a sales representative to help us grow our customer base and increase revenue.", ["Bachelor's degree in Business Administration or related field", "2+ years of experience in sales", "Excellent communication and negotiation skills"]),
    JobPosting("Graphic Designer", "Zeta Inc", "Los Angeles, CA", "We're seeking a graphic designer to help us create visually stunning designs for our marketing materials and products.", ["Bachelor's degree in Graphic Design or related field", "3+ years of experience in graphic design", "Proficiency in Adobe Creative Suite"]),
    JobPosting("Human Resources Manager", "Eta Corp", "Boston, MA", "We're looking for a human resources manager to oversee our company's HR policies and procedures and ensure compliance with all applicable laws and regulations.", ["Bachelor's degree in Human Resources or related field", "5+ years of experience in HR management", "Knowledge of employment law and regulations"]),
    JobPosting("Financial Analyst", "Theta Inc", "Denver, CO", "We're seeking a financial analyst to help us analyze financial data and provide insights to our stakeholders.", ["Bachelor's degree in Finance or related field", "2+ years of experience in financial analysis", "Proficiency in Excel and financial modeling"]),
    JobPosting("Customer Service Representative", "Iota Corp", "Portland, OR", "We're looking for a customer service representative to help us provide excellent customer service and support to our customers.", ["High school diploma or equivalent", "1+ years of experience in customer service", "Excellent communication and problem-solving skills"]),
    JobPosting("Project Manager", "Kappa Inc", "Atlanta, GA", "We're seeking a project manager to lead the planning and execution of projects and ensure they are completed on time, within budget, and to the satisfaction of stakeholders.", ["Bachelor's degree in Project Management or related field", "3+ years of experience in project management", "Experience with project management software"])
]

@router.get("/jobs/{title}", response_model=JobPosting, description="Returns a job posting with the given title.", tags=["Job Postings"])
def read_job_posting_by_title(title: str):
    """Get a job posting by title.

    This endpoint retrieves the details of a job posting based on the provided title.

    Args:
        title (str): The title of the job posting.

    Returns:
        JobPosting: The job posting object containing the details.

    Raises:
        HTTPException: If the job posting is not found, a 404 error is raised.

    """
    posting = next((posting for posting in job_postings if posting.title == title), None)
    if posting is None:
        raise HTTPException(status_code=404, detail="Posting not found")
    return posting

@router.get("/jobs", response_model=List[JobPosting], description="Returns a list of all job postings.", tags=["Job Postings"])
def read_all_job_postings():
    """Get all job postings.

    This endpoint retrieves a list of all available job postings.

    Returns:
        List[JobPosting]: The list of all job postings.

    """
    return job_postings
